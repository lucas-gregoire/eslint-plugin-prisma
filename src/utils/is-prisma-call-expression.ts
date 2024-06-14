import { TSESTree } from '@typescript-eslint/types';
import { ParserServicesWithTypeInformation } from '@typescript-eslint/utils';
import { findNamespaceNameOfType } from './find-namespace-name-of-type';

const PRISMA_NAMESPACES_TO_MATCH = ['Prisma', '.prisma/client'];

export function isPrismaCallExpression(
  callee: TSESTree.MemberExpressionComputedName | TSESTree.MemberExpressionNonComputedName,
  services: ParserServicesWithTypeInformation,
) {
  const calleeType = services.getTypeAtLocation(callee);
  const namespace = findNamespaceNameOfType(calleeType);

  return PRISMA_NAMESPACES_TO_MATCH.some((toMatch) => namespace?.includes(toMatch));
}
