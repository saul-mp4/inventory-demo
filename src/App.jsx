import { Section } from "./components";
import { useStoreState } from "./state/state";
import { DndContext } from "@dnd-kit/core";

function App() {
	const pocket = useStoreState((state) => state.sections.pocket);
	const baggage = useStoreState((state) => state.sections.baggage);

	const dragHandlers = useStoreState((state) => state.dragHandlers);

  return (
    <DndContext 
			onDragStart={dragHandlers.start}
			onDragMove={dragHandlers.move}
			onDragOver={dragHandlers.over}
			onDragEnd={dragHandlers.end}
			>
			<Section title={pocket.title} tileMatrix={pocket.matrix} inventoryItems={pocket.items}/>
			<Section title={baggage.title} tileMatrix={baggage.matrix} inventoryItems={baggage.items}/>
    </DndContext>
  )
}

export default App
