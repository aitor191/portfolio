export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function useFormValidation() {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (
    formData: ContactFormData, 
    translations: {
      nameRequired?: string;
      emailRequired?: string;
      emailInvalid?: string;
      messageRequired?: string;
      messageMinLength?: string;
    } = {}
  ): { isValid: boolean; errors: FormErrors } => {
    const errors: FormErrors = {};
    const {
      nameRequired = 'El nombre es requerido',
      emailRequired = 'El email es requerido',
      emailInvalid = 'El email no es válido',
      messageRequired = 'El mensaje es requerido',
      messageMinLength = 'El mensaje debe tener al menos 10 caracteres',
    } = translations;

    if (!formData.name.trim()) {
      errors.name = nameRequired;
    }

    if (!formData.email.trim()) {
      errors.email = emailRequired;
    } else if (!validateEmail(formData.email)) {
      errors.email = emailInvalid;
    }

    if (!formData.message.trim()) {
      errors.message = messageRequired;
    } else if (formData.message.trim().length < 10) {
      errors.message = messageMinLength;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return { validateForm, validateEmail };
}