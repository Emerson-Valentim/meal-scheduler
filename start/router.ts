import { BaseHttpResponse } from 'App/Controllers/Base/CrudController';

import EstablishmentController from 'App/Controllers/EstablishmentController';

import Orm from './orm';

import Utils from 'App/Services/Utils';

import BodyMiddleware from 'App/Middleware/BodyMiddleware';
import ExceptionMiddleware from 'App/Middleware/ExceptionMiddleware';
import Logger from 'App/Services/Logger';
import EnvironmentController from 'App/Controllers/EnvironmentController';
import TableController from 'App/Controllers/TableController';
import MenuController from 'App/Controllers/MenuController';

type MethodDefinition = {
  [prefix:string]: string
}

type RouteDefinition = {
  [prefix: string]: {
    methods: MethodDefinition
    controller: any
  }
}

const routes: RouteDefinition = {
  establishment: {
    methods: {
      create: 'create',
      update: 'update',
      load: 'load',
      delete: 'delete'
    },
    controller: EstablishmentController,
  },
  environment: {
    methods: {
      create: 'create',
      update: 'update',
      load: 'load',
      delete: 'delete'
    },
    controller: EnvironmentController
  },
  table: {
    methods: {
      create: 'create',
      update: 'update',
      load: 'load',
      delete: 'delete'
    },
    controller: TableController
  },
  menu: {
    methods: {
      create: 'create',
      update: 'update',
      load: 'load',
      delete: 'delete'
    },
    controller: MenuController
  }
};

Object.entries(routes).forEach(([prefix, {methods, controller}]) => {
  Object.values(methods).forEach((controllerMethod) => {
    module.exports[`${prefix}${Utils.capitalize(controllerMethod)}`] = async (event, context): Promise<BaseHttpResponse> => {

      await Orm.init()

      let response: BaseHttpResponse = {
        statusCode: 500,
        body: {
          message: 'Internal server error'
        }
      }
      
      try {
        await beforeMiddleware(event, context)        
        response = await new controller()[controllerMethod as any](event, context)
      } catch( error) {
        ExceptionMiddleware.handle(response, error);
      }
      
      await afterMiddleware(event, context, response)

      return response
    }
  })
})

async function beforeMiddleware(event, context) {
  BodyMiddleware.requestParser(event, context)
}

async function afterMiddleware(event, context, response) {
  Logger.outgoingResponse(event, context, response)
  BodyMiddleware.responseParser(response, context)
}