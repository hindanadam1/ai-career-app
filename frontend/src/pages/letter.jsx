import { useState } from "react";
function letter (){
  return (
    <div>
        <h2>
            Lettre de motivation
        </h2>
        <form action="">
            <label htmlFor="poste"></label>
            <input type="text" name="poste" placeholder="poste"  />
            <input type="text" name="profile" placeholder="profile" />
            <input type="text" name="entreprise" placeholder="entreprise"/>
        </form>
    </div>
  )
}