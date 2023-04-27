// const useInView = (ref: MutableRefObject<HTMLDivElement[]>) => {
//   const [visibleItems, setVisibleItems] = useState<Array<number>>([]);
//   const observerRefs = useRef<Array<IntersectionObserver>>([]);

//   useEffect(() => {
//     ref.current.forEach((ref, i) => {
//       observerRefs.current[i] = new IntersectionObserver(([entry]) => {
//         const inView = entry.isIntersecting;
//         const itemsInView = visibleItems;
//         const index = itemsInView.indexOf(i);
//         inView
//           ? index === -1 && itemsInView.push(i)
//           : index > -1 && itemsInView.splice(index, 1);

//         setVisibleItems(itemsInView);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     observerRefs.current.forEach((or, i) => {
//       or.observe(ref.current[i]);
//     });

//     return () => {
//       if (observerRefs.current) {
//         observerRefs.current.forEach((io) => io?.disconnect());
//       }
//     };
//   }, [ref]);

//   return visibleItems;
// };
