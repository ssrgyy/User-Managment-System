import React from "react"

export interface UserFormProps {
    onSumbit?: (event:  React.FormEvent<HTMLFormElement>) => void;
}