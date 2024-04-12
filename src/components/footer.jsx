const Footer = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {!numPacked
        ? `Start adding items to your packing list 🧳`
        : packedPercent === 100
        ? `You've got everything ready to go! 🎫`
        : `🧳 You have ${numItems} items on your list, and you've already packed ${numPacked} (${packedPercent}%)`}
    </footer>
  );
};

export default Footer;
