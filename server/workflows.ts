/**
 * This is where you define your workflows.
 *
 * Workflows are a way to encode complex flows of steps
 * reusing your tools and with built-in observability
 * on the Deco project dashboard. They can also do much more!
 *
 * When exported, they will be available on the MCP server
 * via built-in tools for starting, resuming and cancelling
 * them.
 *
 * @see https://docs.deco.page/en/guides/building-workflows/
 */
import {
  createStepFromTool,
  createWorkflow,
} from "@deco/workers-runtime/mastra";
import { z } from "zod";
import { Env } from "./main";
import { createListBrazilianStatesTool } from "./tools";

/**
 * Workflow to fetch and process Brazilian states from IBGE
 */
const createFetchBrazilianStatesWorkflow = (env: Env) => {
  const fetchStatesStep = createStepFromTool(createListBrazilianStatesTool(env));

  return createWorkflow({
    id: "FETCH_BRAZILIAN_STATES_WORKFLOW",
    inputSchema: z.object({}),
    outputSchema: z.object({
      states: z.array(
        z.object({
          id: z.number(),
          nome: z.string(),
          sigla: z.string(),
          regiao: z.object({
            id: z.number(),
            nome: z.string(),
            sigla: z.string(),
          }),
        }),
      ),
      total: z.number(),
      summary: z.object({
        totalStates: z.number(),
        regionDistribution: z.record(z.number()),
      }),
    }),
  })
    .then(fetchStatesStep)
    .commit();
};

export const workflows = [
  createFetchBrazilianStatesWorkflow,
];
