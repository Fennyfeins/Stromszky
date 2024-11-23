import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export interface Customer {
    id: number;
    firstname: string;
    surname: string;
    dateOfBirth: Date;
    phone: string;
    street: string;
    number: string;
    postalCode: string;
    city: string;
    iban: string;
}