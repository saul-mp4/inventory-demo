import { Section } from "./components";
import { usePocketState } from "./state/section";

function App() {
	const pocket = usePocketState();

  return (
    <>
			<Section title={pocket.title} tileMatrix={pocket.matrix} inventoryItems={pocket.items}/>
    </>
  )
}

export default App
