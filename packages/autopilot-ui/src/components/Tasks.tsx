import { useGetTasksQuery } from "../graphql-operations";

export const Tasks = () => {
  const { loading, data } = useGetTasksQuery({ variables: { shopId: "1234" } });
  //                 ^?
  return (
    <div className="ui__section-content-box">
      <span className="ui__form-legend ui__form-legend_sticky">Zachowanie</span>
      {loading && <p>Loading...</p>}
      <h1>Task</h1>

      {data && <p>{data.tasks.length}</p>}
    </div>
  );
};
