import * as hardhat from "hardhat"
import { container } from "tsyringe"
import {
  DeployedBridgeBank,
  DeployedBridgeRegistry,
  DeployedCosmosBridge,
  requiredEnvVar,
} from "../src/contractSupport"
import { DeploymentName, HardhatRuntimeEnvironmentToken } from "../src/tsyringe/injectionTokens"
import { setupRopstenDeployment, setupSifchainMainnetDeployment } from "../src/hardhatFunctions"
import {
  BridgeRegistryProxy,
  BridgeTokenSetup,
  BridgeBankProxy,
  CosmosBridgeProxy,
  RowanContract,
  SifchainContractFactories,
} from "../src/tsyringe/contracts"
import * as dotenv from "dotenv"
export type DeployedContractAddresses = {
  cosmosBridge: string
  bridgeBank: string
  bridgeRegistry: string
  rowanContract: string
}
// Usage
//
// npx hardhat run scripts/deploy_contracts.ts

async function main() {
  console.log("point1")
  container.register(HardhatRuntimeEnvironmentToken, { useValue: hardhat })
  await container.resolve(BridgeTokenSetup).complete
  console.log("point2")
  const bridgeBank = await container.resolve(BridgeBankProxy).contract
  console.log("point3")
  const bridgeRegistry = await container.resolve(BridgeRegistryProxy).contract
  console.log("point1")
  const rowanContract = await container.resolve(RowanContract).contract
  console.log("point1")
  const cosmosBridge = await container.resolve(CosmosBridgeProxy).contract
  console.log("cosmosBridge done")
  const result: DeployedContractAddresses = {
    cosmosBridge: cosmosBridge.address,
    bridgeBank: bridgeBank.address,
    bridgeRegistry: bridgeRegistry.address,
    rowanContract: rowanContract.address,
  }
  console.log(JSON.stringify(result))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
