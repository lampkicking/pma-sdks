#PMA SDKS

## browser/pma.sdk.min.js

pma.browser.js can be loaded into a html page, it should be loaded synchronously (blocking) to ensure that adult content is not rendered while checks are being performed. 

```const pma = new PMA(<brand id>, <your validation endpoint>);```

- brand id: This is unique to your brand. If you try using an invalid brand id, or someone else's brand id, the data returned may not be valid.
- validation endpoint: This is where you want your users to be sent after age verifcation if you dont use an iframe.

By default, the pma object will use *www.provemyage.com*, however during testing you are advised to set the pma domain to point at *sandbox.provemyage.com*

```pma.domain = 'sandbox.provemyage.com';```



### Check for an age token

Fire this javascript method to check for an age token.
```pma.listen(callbackFunction)```

The callbackFunction will be triggered after an age token check is complete. Your callback should take two parameters. *error* and *redirect_url*;

- If *error* is not null then the user has no age_token.
- If *redirect_url* has a value, you _should_ verify the response.




## Response verification
There are examples of how to verify responses using different backend languages. 
