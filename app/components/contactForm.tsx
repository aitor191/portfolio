'use client';

import { useState, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/languageContext';
import { useFormValidation } from '../hooks/useFormValidation';
import { useAnalytics } from '../hooks/useAnalytics';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Validar que las variables de entorno de EmailJS estén configuradas
const isEmailJSConfigured = () => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
};

export function ContactForm() {
  const { t } = useLanguage();
  const { validateForm } = useFormValidation();
  const { trackContactFormSubmit } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');
    setFieldErrors({});

    // MEJORA 1: Validar configuración de EmailJS antes de continuar
    if (!isEmailJSConfigured()) {
      setStatus('error');
      setStatusMessage('Error de configuración: EmailJS no está configurado correctamente.');
      // Log para desarrollo (no se expone al usuario en producción)
      if (process.env.NODE_ENV === 'development') {
        console.error('EmailJS configuration error:', {
          hasServiceId: !!EMAILJS_SERVICE_ID,
          hasTemplateId: !!EMAILJS_TEMPLATE_ID,
          hasPublicKey: !!EMAILJS_PUBLIC_KEY,
        });
      }
      return;
    }

    // Validar formulario con traducciones
    const { isValid, errors } = validateForm(formData, {
      nameRequired: t.contact.formNameRequired,
      emailRequired: t.contact.formEmailRequired,
      emailInvalid: t.contact.formEmailInvalid,
      messageRequired: t.contact.formMessageRequired,
      messageMinLength: t.contact.formMessageMinLength,
    });
    
    if (!isValid) {
      setStatus('error');
      setFieldErrors(errors);
      // Mostrar el primer error encontrado como mensaje general
      const firstError = Object.values(errors)[0];
      setStatusMessage(firstError || t.contact.formError);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setStatusMessage(t.contact.formSuccess);
      setFormData({ name: '', email: '', message: '' });
      setFieldErrors({});
      
      // Track successful form submission
      trackContactFormSubmit();
    } catch (error) {
      setStatus('error');
      setStatusMessage(t.contact.formError);
      
      // MEJORA 2: Logging detallado de errores sin exponer información sensible
      if (process.env.NODE_ENV === 'development') {
        // En desarrollo, log más detallado para debugging
        const errorDetails = error instanceof Error 
          ? { message: error.message, name: error.name }
          : { type: typeof error, value: String(error) };
        
        console.error('EmailJS send error:', {
          ...errorDetails,
          timestamp: new Date().toISOString(),
          // No logueamos datos del formulario por seguridad
        });
      } else {
        // En producción, solo log básico
        console.error('Failed to send email via EmailJS');
      }
    }
  };

  // Resetear el estado después de 5 segundos cuando hay éxito
  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  return (
    <div className="contact-form-container">
      <h3>{t.contact.formTitle}</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">{t.contact.formName}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.contact.formNamePlaceholder}
            required
            disabled={status === 'sending'}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {/* MEJORA 3: Mensaje de error accesible con aria-describedby */}
          {fieldErrors.name && (
            <span id="name-error" className="field-error" role="alert" aria-live="polite">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t.contact.formEmail}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.formEmailPlaceholder}
            required
            disabled={status === 'sending'}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {/* MEJORA 3: Mensaje de error accesible con aria-describedby */}
          {fieldErrors.email && (
            <span id="email-error" className="field-error" role="alert" aria-live="polite">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">{t.contact.formMessage}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.formMessagePlaceholder}
            rows={6}
            required
            disabled={status === 'sending'}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          />
          {/* MEJORA 3: Mensaje de error accesible con aria-describedby */}
          {fieldErrors.message && (
            <span id="message-error" className="field-error" role="alert" aria-live="polite">
              {fieldErrors.message}
            </span>
          )}
        </div>

        {/* MEJORA 3: Mensaje de estado accesible con aria-live para lectores de pantalla */}
        {statusMessage && (
          <div 
            className={`form-status ${status}`}
            role="alert"
            aria-live={status === 'error' ? 'assertive' : 'polite'}
            aria-atomic="true"
          >
            {statusMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? t.contact.formSending : t.contact.formSubmit}
        </button>
      </form>
    </div>
  );
}