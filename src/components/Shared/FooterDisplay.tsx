type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';

interface FooterDisplayProps {
  show: boolean;
  content: string;
  textAlign: TextAlign;
}

const FooterDisplay: React.FC<FooterDisplayProps> = ({ show, content, textAlign }) => {
  return (
    <div>
        {show && (
            <div className="footer">
                <div className="footer-content" style={{ textAlign }}>
                    {content}
                </div>
            </div>
        )}
    </div>
  );
};

export default FooterDisplay;
