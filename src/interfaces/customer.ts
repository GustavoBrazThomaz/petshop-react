export interface PropsCustomerCard{
    props: Customer
}

export interface Customer{
    name: string,
    lastName: string,
    cpf: number,
    phone: number,
    payment: boolean,
    _id?: string,
    __v?: string,
    pets?: Array<Pets>
}

export interface Pets {
    name: string;
    age: number;
    genger: string;
    weight: number;
    height: number;
    service: string;
    species: string;
};

