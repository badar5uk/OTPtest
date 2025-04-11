declare module 'country-list' {
    interface Country {
      code: string;
      name: string;
    }
  
    function getData(): Country[];
    function getName(code: string): string | undefined;
    function getCode(name: string): string | undefined;
  }