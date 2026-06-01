import { AppCard } from "../../components/AppCard/AppCard";
import { apps } from "./apps";

export default function Landing() {
  return (
    <div>
      landing
      {apps.map((props) => (
        <AppCard {...props} key={props.cardTitle} />
      ))}
    </div>
  );
}
