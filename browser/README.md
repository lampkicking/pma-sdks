# Browser SDK

## Setup
`npm i`

## Commands
start development
`npm run dev`

start build
`npm run build`

## API
instantiate the pma instance
```
let instance = new PMA({
  brandId: <brand-id>,
  redirectTo: <full-path>
})
```

start PMA selection flow
```
instance.optionsView()
```

start PMA yoti app flow
```
instance.yotiAppView()
```

check you already age verified
```
instance
  .checkIsAgeVerified()
  .then(({ status, message }) => { 
    console.log('status', status);    // => 200
    console.log('message', message);  // => https://redirect-url
  })
  .catch(({ status, error }) => { 
    console.log('status', status);   // => 403
    console.log('error', error);     // => null
  })
```
