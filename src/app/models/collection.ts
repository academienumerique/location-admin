// models/collection-item.model.ts

export interface CollectionItem {
    // Autres propriétés de l'item
    // ...
  
    // Propriété pour stocker les libellés des champs
    fieldLabels: {
      name: string;
      description: string;
      // Ajoutez d'autres libellés de champs ici au besoin
      // Pour chaque champ, ajoutez une entrée dans fieldLabels correspondant au nom du champ dans la collection
    };
  }
  
  // Interface pour la collection 'collections'
  export interface CollectionsItem extends CollectionItem {
    // Propriétés spécifiques à la collection 'collections'
    name: string;
    namemenu: string;
  }
  
  // Interface pour la collection 'companies'
  export interface CompaniesItem extends CollectionItem {
    // Propriétés spécifiques à la collection 'companies'
    adresse: string;
    id: string;
    name: string;
  }
  
  // Interface pour la collection 'relais'
  export interface RelaisItem extends CollectionItem {
    // Propriétés spécifiques à la collection 'relais'
    id: string;
    name: string;
  }

  
  