import EstablishmentController from 'App/Controllers/EstablishmentController';
import HttpController from 'App/Controllers/HttpController';
import BodyMiddleware from 'App/Middleware/BodyMiddleware';

import Utils from 'App/Services/Utils';

type MethodDefinition = {
  [prefix:string]: string
}

type RouteDefinition = {
  [prefix: string]: {
    methods: MethodDefinition
    controller: HttpController
  }
}

const routes: RouteDefinition = {
  establishment: {
    methods: {
      create: 'create'
    },
    controller: new EstablishmentController(),
  }
};

Object.entries(routes).forEach(([prefix, methodDefinition]) => {
  Object.values(methodDefinition.methods).forEach((controllerMethod) => {
    module.exports[`${prefix}${Utils.capitalize(controllerMethod)}`] = async (event, context) => {
      BodyMiddleware.requestParser(event, context)
      const response = await methodDefinition.controller[controllerMethod as any](event, context)
      BodyMiddleware.responseParser(response, context)
      return response
    }
  })
})
