import { todoContract } from '@libs/core-contract/index';
import { generateOpenApi } from '@ts-rest/open-api';

// we need to use the main contract to generate the OpenAPI spec for all routes
export const openApiDocument = generateOpenApi(todoContract, {
  info: {
    title: 'Todos API',
    version: '1.0.0',
  },
});
