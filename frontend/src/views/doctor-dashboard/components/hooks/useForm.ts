"use client";
import { formikFieldConfig } from "@/utils";
import { FormikValues, useFormik } from "formik";
import { useEffect, useState } from "react";

const useForm = <T extends FormikValues>(values: T, save: (values: T) => Promise<void>, yupValidationSchema?: any) => {
  const [editMode, setEditMode] = useState(false);

  const form = useFormik({
    initialValues: values as FormikValues,
    onSubmit: (values) => {
      form.setSubmitting(true);
      save(values as T).finally(() => {
        form.setSubmitting(false);
        setEditMode(false);
      });
    },
    validationSchema: yupValidationSchema,
    validateOnChange: true,
    enableReinitialize: true,
  });

  const fieldConfig = formikFieldConfig(form);

  useEffect(() => {
    if (editMode) {
      form.resetForm();
    }
  }, [editMode]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    form.handleSubmit();
  };

  return { form, editMode, fieldConfig, setEditMode, handleEdit, handleCancel, handleSave };
};

export default useForm;
