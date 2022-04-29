# Routes
### home - randomly fetch a record, fetch 5 favourite records

to fetch a record...
`GET /records/:id`

RESPONSE return ENTIRE record object matching ID.

to fetch a list of the users favourited records...
`GET /favourites/user/:id`  

RESPONSE return record title, artist, price for all favourite records for user ID.

### header component

to quick search for a record...
`GET /records/search?title=xyz`

RESPONSE return record object matching record title.

to display the username...
`GET /users/:id`

RESPONSE return username from user object.

### mycollection - see all favourites and all records posted by current user
to fetch a user's favourites... 
`GET /favourites/user/:id`

RESPONSE return record title, artist, price for all favourite records associated for listed user ID.

to display a users listings...
`GET /records/seller/:id`

RESPONSE return record title, artist, price for all records listed to be solid by the user ID.

to update a listing to sold...
`POST /records/:id/sold (end point secuirty... ensure seller_id is equal to current session before performing action)`

RESPONSE return record availabilty updated to TRUE from FALSE for the record object.

to delete an exsisting record
`POST /records/:id/delete (end point secuirty... ensure seller_id is equal to current session before performing action)`
or
`DELETE /records/:id`

RESPONSE removes the record ID from the record table and object.

## advanced search - search all exsisting records 
`GET /records/search?title=xyz&artist=xyz&minprice=xyz&maxprice=xyz&genre=xyz&availability=xyz`

## my turntable - record detail page, user can also read comments, and post a new one

to fetch a record's information...
`GET /records/:id`

RESPONSE returns the records object per ID.

to showcase the comments
`GET /comments/record/:id` 

to post a new comment associated with a specific record...
`POST /comments/record/:id/new`

## sell-a-record - make a listing to post a new record
`POST /records/new`
