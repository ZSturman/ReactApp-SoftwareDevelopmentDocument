import "./SettingsButtons.scss"

interface SettingsButton {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface SettingsButtonsProps {
  buttons: SettingsButton[];
  handleButtonClick: (buttonId: string) => void; // New prop for handling button click
}

const SettingsButtons: React.FC<SettingsButtonsProps> = ({ buttons, handleButtonClick }) => {
  return (
    <div className="settings-buttons">
      {buttons.map((button) => (
        <button
          key={button.id}
          id={button.id}
          className="settings-button"
          onClick={() => handleButtonClick(button.id)}
        >
          <div className="settings-button-icon">
            <button.icon />
          </div>

        </button>
      ))}
    </div>
  );
};

export default SettingsButtons;
