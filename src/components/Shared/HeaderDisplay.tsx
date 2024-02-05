type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';

interface HeaderDisplayProps {
  show: boolean;
  content: string;
  textAlign: TextAlign;
}

const HeaderDisplay: React.FC<HeaderDisplayProps> = ({ show, content, textAlign }) => {
  return (
    <div>
        {show && (
            <div className="header">
                <div className="header-content" style={{ textAlign }}>
                    {content}
                </div>
            </div>
        )}
    </div>
  );
};

export default HeaderDisplay;
