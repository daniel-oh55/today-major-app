import type { BaseballDataProvider } from "./types";
import { DummyProvider } from "./dummy/dummyProvider";
import { BallDontLieProvider } from "./balldontlie/ballDontLieProvider";
import { MySportsFeedsProvider } from "./mysportsfeeds/mySportsFeedsProvider";
import { ENV } from "../config/env";

let _instance: BaseballDataProvider | null = null;

export function getBaseballDataProvider(): BaseballDataProvider {
  if (_instance) return _instance;

  switch (ENV.provider) {
    case "balldontlie":
      _instance = new BallDontLieProvider(ENV.apiKey);
      break;
    case "mysportsfeeds":
      _instance = new MySportsFeedsProvider(ENV.apiKey);
      break;
    default:
      _instance = new DummyProvider();
  }

  return _instance;
}
