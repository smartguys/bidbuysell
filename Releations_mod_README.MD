The _relationships_mod is modified so that we can use 
* `localhost:3000/messagethreads/?_embed=messages`
and
* `localhost:3000/administrators?_expand=user`

The changes to attributes are:

* In `messages`, I changed `thread` to `messagethreadId`.
* And in `administrators` I changed `id` to `userId`.
