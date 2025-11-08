import { FloatingAddButton } from '@/components/button/FloatingAddButton';
import { DraggableList } from '@/components/draggable-list';
import { Page } from '@/components/page';

export default function HomeScreen() {
  return (
    <Page>
      <DraggableList />
      <FloatingAddButton />
    </Page>
  );
}
