import useCategories from "../hooks/useCategories";
import SubCategories from "./SubCategories";
import Spinner from "./Spinner";

export default function AllCategories() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) return <Spinner />;

  return (
    <div className="row mt-5">
      {categories.map((category) => (
        <div className="col-md-3" key={category._id}>
          <SubCategories category={category} />
        </div>
      ))}
    </div>
  );
}
