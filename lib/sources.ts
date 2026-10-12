export type Source =
  | { kind: "arbeitnow"; name: string }
  | { kind: "greenhouse"; name: string; board: string; match?: string };

export const SOURCES: Source[] = [
  {
    kind: "greenhouse",
    name: "Nordeus",
    board: "nordeus",
  },
  {
    kind: "greenhouse",
    name: "JetBrains",
    board: "jetbrains",
    match: "Serbia",
  },
  {
    kind: "greenhouse",
    name: "Databricks",
    board: "databricks",
    match: "Serbia",
  },
  { kind: "greenhouse", name: "Wolt", board: "wolt" },
  { kind: "greenhouse", name: "SumUp", board: "sumup" },
  { kind: "greenhouse", name: "N26", board: "n26" },
  { kind: "arbeitnow", name: "Arbeitnow" },
];
