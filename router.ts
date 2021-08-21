import { Utils } from 'App/Services/Utils';

type RouteDefinition = {
  [prefix: string]: {
    [path: string]: string
  }
}

const routes: RouteDefinition = {
  establishment: {
    create:  'create',
  },
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  };
};

Object.entries(routes).forEach(([routePrefix, controllerDefinition]) => {
  Object.entries(controllerDefinition).forEach(([routePath, methodDefinition]) => {
    module.exports[`${routePrefix}${routePath}`] = require(`./app/Controllers/${Utils.capitalize(routePrefix)}Controller/`)[methodDefinition]
  });
});
