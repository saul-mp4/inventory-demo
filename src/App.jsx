import { Section } from "./components";
import { useStoreState } from "./state/state";

function App() {
	const pocket = useStoreState((state) => state.pocket);
	const baggage = useStoreState((state) => state.baggage);

  return (
    <>
			<Section title={pocket.title} tileMatrix={pocket.matrix} inventoryItems={pocket.items}/>
			<Section title={baggage.title} tileMatrix={baggage.matrix} inventoryItems={baggage.items}/>
    </>
  )
}

export default App
