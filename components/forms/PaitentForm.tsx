"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form
} from "@/components/ui/form";
export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    SELECT='select',
    PHONE_INPUT='phoneInput',
    DATE_PICKER='datePicker',
    SKELETON='skelton',
    CHECKBOX='checkbox'
}
import CustomFormField from "../CustomFormField";
import SubmiButton from "../SubmiButton";
import { useState } from "react";
import UserFormValidation from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/paitent.actions";


const PaitentForm=()=> {
  // 1. Define your form.
  const router= useRouter();
  const[isLoading,setIsLoading]= useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  });


   async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try{
      const userData ={name, email, phone};
      const user= await createUser(userData);
      if(user) router.push(`/patients/${user.$id}/register`)

    }
    catch(error){
      console.error(error);
    }

  }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <section>
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="Johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="+91 9999999999"
          />
         <SubmiButton isLoading={isLoading}>Getting Started</SubmiButton>
        </form>
      </Form>
    );
}





export default PaitentForm;
