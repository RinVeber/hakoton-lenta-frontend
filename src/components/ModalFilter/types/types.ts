export interface ModalProps {
    isActive: boolean;
    handleOpenModal: () => void;
  }

  export interface SelectOption {
    id: number;
    title: string;
  }

  export interface SearchForm {
    city: SelectOption | null;
    store: SelectOption | null;
    group: SelectOption | null;
    category: SelectOption | null;
    subcategory: SelectOption | null;
    sku: SelectOption | null;
  }

  export type categoryType = "city" | "store" | "group" | "category" | "subcategory" | "sku";