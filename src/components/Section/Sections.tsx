import SectionForm from "./SectionForm"
import { useDocDataContext } from "../../contexts";
import DragAndDrop from "../Chapter/DragAndDrop";
import "./SectionForm.scss"

interface SectionsProps {
  currentChapter: string
}

const Sections: React.FC<SectionsProps> = ({ currentChapter }) => {
  const { sectionDataManager } = useDocDataContext();

  const sections = sectionDataManager.getSectionsByChapterId(currentChapter);

  return (
    <div className="sections-container">
      {sections.map((section, index) => (
        <DragAndDrop
          key={section.id}
          id={section.id}
          index={index}
          handleListChange={sectionDataManager.reorderSections}
        >
          <SectionForm
            key={section.id}
            sectionId={section.id}
          />
        </DragAndDrop>
      ))}
    </div>
  );
};

export default Sections;
