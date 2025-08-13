import Button from "./Button.jsx";
import { useDispatch } from "react-redux";
import { setCategoriaSeleccionada } from "../../store/moviesSlice.js"; // Update the path as needed

function CategoryBar() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Accion"));
        }}
        label={"Accion"}
        className="bg-blue-500 hover:bg-blue-600"
      />
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Comedia"));
        }}
        label={"Comedia"}
        className="bg-green-500 hover:bg-green-600"
      />
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Drama"));
        }}
        label={"Drama"}
        className="bg-red-500 hover:bg-red-600"
      />
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Terror"));
        }}
        label={"Terror"}
        className="bg-black hover:bg-gray-950"
      />
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Romántico"));
        }}
        label={"Romántico"}
        className="bg-purple-500 hover:bg-purple-600"
      />
      <Button
        onClick={() => {
          dispatch(setCategoriaSeleccionada("Psicológico"));
        }}
        label={"Psicológico"}
        className="bg-yellow-500 hover:bg-yellow-600"
      />
    </div>
  );
}

export default CategoryBar;
