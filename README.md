# Good Reads for Travel

List component for books search by location.

- Responsive view
- Grid and list view options
- Items per page customisable by dev and selectable by user
- Filter search within book themes
- Pagination
- Display view- Choose between list view or grid view.
- Support for multi Language


## Features
Avaible in the user interface.  


- Filter search within book themes.  
- Choose the number limit of itens by page.  
- Pagination.  
- Choose between list view or grid view.  
- Multi languages.  



### Example

To simulate a website an example page was created using the component. 




##### Usage
Download or copy the repository main brach. 

Install the dependencies:
`yarn install`

You will need a api key token(see bellow on external API).

Run the project:
`yarn start`



## Props
Avaible for the developer.

| Name            | type   | Default | Description                                                                                |
| --------------- | ------ | ------- | ------------------------------------------------------------------------------------------ |
| `locationInput `  | array  |         | Location/destination to be searched accepts: [“city”] or  [“city”, “country”] or [latitude, longitude]|
|` hasImage  `      | bool   | true    | Defines if book's cover image will appear.                                                 |
| `hasSubject `     | bool   | true    | Defines if book's subject will appear.                                                     |
| `searchLimit`     | number | 20      | Defines the number of books serchead per request                                           |
| `userLimitSearch `| bool   | true    | Defines if select limit component will appear to user.







### External API

OpenLibray API, for book search.  https://openlibrary.org/developers/api



LocationIQ, to reverse geolocation. You will need a key token to access the api. https://locationiq.com/docs
