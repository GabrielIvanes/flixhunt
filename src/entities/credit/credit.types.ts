export type CreditBase = {
    id: number;
    creditId: string;
};

export type CreditCastBase = CreditBase & {
    character: string;
};

export type CreditCrewBase = CreditBase & {
    department: string;
    job: string;
};
