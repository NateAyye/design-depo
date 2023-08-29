function ItemGrid({ children }) {
  return (
    <div className="py-5 px-8 grid gap-5 grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3">
      {children}
    </div>
  )
}

export default ItemGrid