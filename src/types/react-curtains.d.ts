declare module "react-curtains" {
  import type { FC } from "react";
  export const Curtains: FC<any>;
  export const Plane: FC<any>;
  export const PingPongPlane: FC<any>;
  export const RenderTarget: FC<any>;
  export const ShaderPass: FC<any>;
  export const FXAAPass: FC<any>;
  export function useCurtains(): any;
  export function useCurtainsEvent(
    event: string,
    handler: (...args: any[]) => void
  ): void;
}
