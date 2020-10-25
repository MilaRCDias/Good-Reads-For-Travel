# Good Reads for Travel


It accepts a string name of city or city, country, or geographic coordinates numbers. Returns the list of books in a responsive view.

On mobile view the cover image is hidden for better display.




### Example

To simulate a website an example page was created using the component. 


You can see it directly on Netifly,
or download and run it locally.


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
| `locationInput `  | array  |         | Location/destination to be searched accepts: city or city, country or latitude, longitude, |
|` hasImage  `      | bool   | true    | Defines if book's cover image will appear.                                                 |
| `hasSubject `     | bool   | true    | Defines if book's subject will appear.                                                     |
| `searchLimit`     | number | 20      | Defines the number of books serchead per request                                           |
| `userLimitSearch `| bool   | true    | Defines if select limit component will appear to user.






## Features
Avaible in the user interface.

`Filter` - Filter search within book themes.
`Search limit by page` - Choose the number limit of itens by page.
`Pagination` - Navigate through the results by page.
`Display view`- Choose between list view or grid view.
`Multi Language` - Support for languages.


### External API

OpenLibray API, for book search.  https://openlibrary.org/developers/api



LocationIQ, to reverse geolocation. You will need a key token to access the api. https://locationiq.com/docs