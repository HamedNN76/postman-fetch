# Postman Fetch

A package for fetch from your postman collection easily with name of your request.

## Description

In every project there is a pain for having a full document for an application services or APIs.
The Postman application is a good place for testing or using our services, so we need to set headers, body or query params and etc for a service to work and also you have environment variables.

But you need to set all the parameters in code to call your services.

With this package and Postman JSON collection we can fetch our services easily with the request name that we set in postman application. 
## Installing

Easily installing from npm with blow command:

```
npm i -s postman-fetch
```

### Using the package

This package provide PostmanFetch class for handle your API requests.

We have to pass two parameters to this class:

- Postman exported JSON collection (v2.1).
- Options:
    - variables: pass your postman environment variables as an object.
    - debug: this flag log the important thing like request and params for development.

For example you can make fetch.js file like this:
```
import PostmanFetch from 'postman-fetch';
//or
import { PostmanFetch } from 'postman-fetch';
import * as postmanCollection from 'path/to/postmanCollection';

const options = {
    variables: {
        baseURL: 'https://api.com/v1',
        adminToken: 'A jwt token',
        userToken: 'A jwt token',
        ...
    },
    debug: true //default false
};
const { fetch } = new PostmanFetch(postmanCollection, options);

export default fetch;
```

For example you have a request with "getUsers" name.

And then in another file use the fetch method:
```
import fetch from '/path/to/fetch.js';

fetch('getUsers')
```
Or if you have created directory in your postman for example:

adminPanel -> users -> getAllUsers

You can do like this:
```
import fetch from '/path/to/fetch.js';

fetch('adminPanel.users.getAllUsers')
```

From now you can fetch your request the headers, url, variables and all the thing that set in postman before.

What if you need to change a variable in some events in your application? For example you want to save the authenticated user token in your fetch method or remove it after logout.

You can easily set your new variables with "setVariables" method in PostmanFetch class.

So we have some changes in fetch.js file:

```
const { fetch, setVariables } = new PostmanFetch(postmanCollection, options);

export {
    fetch,
    setVariables
};
export default fetch;
```

And then in another file your need to pass an object as new variables to update the PostmanFetch class:

```
import { setVariables } from '/path/to/fetch.js';

const newVariables = {
    userToken: 'new jwt token',
    ...
};
setVariables(newVariables); //this method only update the passed property!
```

## Examples

... Description 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
