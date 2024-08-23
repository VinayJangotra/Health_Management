"use client"
import React from 'react'
import { Input } from "@/components/ui/input";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import E164Number from "react-phone-number-input";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PaitentForm';
import { date } from 'zod';
import { SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Select } from './ui/select';
import { Purple_Purse } from 'next/font/google';
import { Textarea } from './ui/textarea';
interface CustomProps{
    control:Control<any>
    fieldType:FormFieldType
    name:string
    label?:string
    placeholder?:string
    iconSrc?:string
    iconAlt?:string
    disabled?:boolean
    dateFormat?:string,
    showTimeSelect?:boolean
    children?:React.ReactNode 
    renderSkelton?: (field:any)=>React.ReactNode
}
const RenderInput=({field,props}:{field:any; props:CustomProps})=>{
    const {fieldType, iconSrc, iconAlt, placeholder,showTimeSelect,dateFormat, renderSkelton}=props
   switch (fieldType) {
     case FormFieldType.INPUT:
       return (
         <div className="flex rounded-md border border-dark-500 bg-dark-400">
           {iconSrc && (
             <Image
               src={iconSrc}
               height={24}
               width={24}
               alt={iconAlt || "ICON ALt"}
               className="ml-2"
             />
           )}
           <FormControl>
             <Input
               {...field}
               placeholder={placeholder}
               className="shad-input border-0"
             />
           </FormControl>
         </div>
       );
     case FormFieldType.PHONE_INPUT:
       return (
         <FormControl>
           <PhoneInput
             defaultCountry="IN"
             placeholder={placeholder}
             international
             withCountryCallingCode
             value={field.value}
             onChange={field.onChange}
             className="input-phone"
           />
         </FormControl>
       );
     case FormFieldType.DATE_PICKER:
       return (
         <div className="flex rounded-md border border-dark-500 bg-dark-400">
           <Image
             src="/assets/icons/calendar.svg"
             height={24}
             width={24}
             alt="calender"
             className="ml-2"
           />
           <FormControl>
             <DatePicker
               selected={field.value}
               onChange={(date) => field.onChange(date)}
               dateFormat={dateFormat ?? "MM/ dd/ yyyy"}
               showTimeSelect={showTimeSelect ?? false}
               timeInputLabel="Time:"
               wrapperClassName="date-picker"
             />
           </FormControl>
         </div>
       );
     case FormFieldType.SELECT:
       return (
         <FormControl>
           <Select onValueChange={field.change} defaultValue={field.value}>
             <SelectTrigger className="shad-select-trigger">
               <SelectValue placeholder={placeholder} />
             </SelectTrigger>
             <SelectContent className="shad-select-content">
               {props.children}
             </SelectContent>
           </Select>
         </FormControl>
       );
     case FormFieldType.SKELETON:
       return props.renderSkelton ? props.renderSkelton(field) : null;
     case FormFieldType.TEXTAREA:
       return (
         <FormControl>
           <Textarea
             placeholder={props.placeholder}
             {...field}
             className="shad-textArea"
             disabled={props.disabled}
           />
         </FormControl>
       );
     default:
       return null;
   }
   }

const CustomFormField = (props:CustomProps) => {
    const {control, fieldType, name, label}=props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className='flex-1'>
        {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
        )}
        <RenderInput field={field} props={props}/>
        <FormMessage className='shad-error'/>
        </FormItem>
        )}
      />
    </div>
  );
}

export default CustomFormField
