import { Panel } from "primereact/panel";

export default function Home() {

  return (
    <>
      <Panel header="Welcome!">
        <p className="m-0 text-justify">
          This website went a complete overhaul using React, TypeScript, Vite,
          TailwindCSS, and PrimeReact. All features are the same as before, but
          now you can use your phone! Feel free to let me know what you think and how it can be improved in the future.
        </p>
      </Panel>
    </>
  );
}