import type { FC } from "react";
import { sum } from "@shared/first/lib/index.js";
import { __cg } from "@shared/first/lib/logger.js";

const Home: FC = () => {
  sum();

  __cg("shared cb", 1010);
  return (
    <div className="text-gray-300">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime quas
      facere voluptatibus aliquid unde iure dolore aperiam eius esse, deserunt,
      quos minus porro dolores. Atque magni at repellendus mollitia porro?
      Blanditiis totam, corrupti explicabo consequuntur nulla magni porro illum
      delectus. Delectus reprehenderit, officia tempora id totam nisi asperiores
      perspiciatis maiores? Delectus incidunt vero esse. Aperiam impedit tenetur
      assumenda soluta nihil? Ab dicta aut dolor laboriosam iste! Consequuntur
      hic earum recusandae, tempore aliquam rem optio sint iure voluptas beatae
      rerum in corrupti sequi qui incidunt maxime voluptates, ratione corporis
      deleniti nam. Reiciendis, veniam. Adipisci sapiente esse, placeat
      similique nemo veniam, exercitationem impedit fuga alias quae in
      laboriosam ipsum aut dolorem dolorum. Ipsam nobis repellendus asperiores
      eos consequatur numquam accusantium minima adipisci. Atque aut illo ullam
      assumenda reiciendis itaque quis explicabo ea officiis. Cumque facilis
      eaque, quod maxime sequi animi, labore dolore accusamus quae architecto
      quibusdam quisquam ipsum ut repellat delectus cupiditate? Modi ratione
      ipsa in natus eius porro dolor tenetur adipisci voluptate. Necessitatibus
      quod voluptate distinctio enim. Facilis alias minus beatae adipisci earum
      consequuntur, ipsam unde, iusto atque accusantium dignissimos molestias!
      Rerum ipsum eos tenetur quisquam eius cupiditate adipisci libero,
      recusandae cumque debitis, non provident doloribus praesentium hic natus,
      mollitia officiis. Nobis harum iste hic? Quaerat temporibus perferendis
      aspernatur deserunt voluptatibus. Perferendis fugiat excepturi nesciunt
      earum expedita illum architecto omnis debitis saepe quisquam unde numquam,
      officiis perspiciatis, non voluptates est accusantium? Doloribus illo,
      alias suscipit recusandae saepe minima nostrum sint deleniti. Optio odio
      tenetur odit alias. Corrupti nam sapiente ea nulla laudantium cum
      exercitationem vitae sunt delectus illo. Vel sint ab rem omnis dolore
      nobis debitis veniam ex velit, necessitatibus at? Quae ipsam rem soluta
      sit recusandae temporibus? Non, aperiam asperiores similique, placeat
      mollitia quibusdam sapiente provident corrupti perspiciatis porro autem
      praesentium magnam itaque vel aspernatur rem molestias accusamus odit
      cupiditate?
    </div>
  );
};

export default Home;
