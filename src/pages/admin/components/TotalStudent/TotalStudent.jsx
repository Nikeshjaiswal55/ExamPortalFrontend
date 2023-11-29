export function TotalStudent({ totalStudent }) {
  return (
    <>
      <div className="card bg-dark h-25 d-flex flex-row rounded-3 p-3 gap-3  ">
        <div className="w-100 py-3  btn rounded-3 d-flex flex-column align-items-center justify-content-center cos ">
          <h3 className="text-light">Total Student</h3>
          <h3 className="text-light py-2">{totalStudent?.length}</h3>
        </div>
        <div className="w-100 py-3 btn  text-bg-light rounded-3 d-flex flex-column align-items-center justify-content-center">
          <h3>Attempted Student</h3>
          <h3 className="py-2">10</h3>
        </div>
      </div>
    </>
  );
}
