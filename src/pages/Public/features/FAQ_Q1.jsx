import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { FaRegQuestionCircle } from "react-icons/fa";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { IoAlertCircle } from "react-icons/io5";
const FAQ_Q1 = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      <RolesNavbar />

      {/* ------------- FAQ News Style Section ------------ */}
      <section className="max-w-4xl mx-auto py-16 px-4 bg-white">
        <h1 className="text-4xl font-bold mb-6 text-[#071e55] text-left">
          Frequently Asked Questions
        </h1>
        <div className="mb-8 text-gray-600 text-sm">
          <span>Published on November 1, 2024</span>
          <span className="mx-4">|</span>
          <span>Author: Koi Health Center</span>
        </div>

        <article className="border-b pb-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What are common koi diseases and treatments?
          </h2>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaRegQuestionCircle className="mr-2 text-blue-500" />
            <span>Koi Health</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Koi fish are generally hardy, but they can still be prone to several
            common diseases, especially when water quality or environmental
            conditions are poor.
          </p>
          <button
            onClick={handleToggleDetails}
            className="mt-4 text-blue-600 hover:underline focus:outline-none"
          >
            {showDetails ? "Hide Detailed Treatments" : "Read Full Article"}
          </button>

          {showDetails && (
            <div className="mt-6 text-gray-700">
              <h3 className="text-2xl font-semibold mb-4">
                Detailed Treatments
              </h3>
              {/* section 1 */}
              <h4 className="text-xl font-semibold mt-6">
                1. Ich (White Spot Disease)
              </h4>
              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Ich, also known as <em>Ichthyophthirius multifiliis</em>, is a
                common parasitic disease affecting koi and other freshwater
                fish. It often occurs when fish are stressed, usually due to
                poor water quality or sudden changes in environmental
                conditions.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <strong>Parasitic Infection:</strong> Caused by the protozoan
                  parasite <em>Ichthyophthirius multifiliis</em>.
                  <strong>Stress Factors:</strong> Poor water quality,
                  overcrowding, sudden temperature changes, or introducing new
                  fish without proper quarantine.
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700">
                  White spots, flashing, lethargy.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700">
                  Raise water temperature, salt bath, formalin.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Quarantine New Fish:</strong> Quarantine new fish
                    for at least two weeks before introducing them to the main
                    tank or pond.
                  </li>
                  <li>
                    <strong>Regular Monitoring:</strong> Regularly check water
                    parameters and monitor fish behavior to catch signs of
                    stress early.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Maintain a suitable
                    fish-to-water ratio to reduce stress.
                  </li>
                </ul>
              </div>
              {/* section 2 */}
              <h4 className="text-xl font-semibold mt-4">2. Fin Rot</h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Fin Rot is a common bacterial disease that affects the fins and
                tails of koi and other freshwater fish. It is often a result of
                stress or injury and can be exacerbated by poor water quality or
                suboptimal living conditions. If left untreated, Fin Rot can
                lead to the complete deterioration of fins and can even become
                life-threatening.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Bacterial Infection:</strong> Fin Rot is primarily
                  caused by bacteria, often <em>Aeromonas</em>,{" "}
                  <em>Pseudomonas</em>, or <em>Vibrio</em> species, which thrive
                  in unclean or poorly maintained water.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Stress Factors:</strong> Fish are more susceptible to
                  Fin Rot when they experience stress due to:
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Poor water quality (high levels of ammonia, nitrites, or
                      nitrates)
                    </li>
                    <li>
                      Injuries from fighting, handling, or rough surfaces in the
                      tank or pond
                    </li>
                    <li>
                      Overcrowding, leading to increased aggression and stress
                    </li>
                    <li>Sudden changes in water temperature or pH</li>
                  </ul>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Fraying or Discolored Fins:</strong> Affected fins may
                  appear ragged, frayed, or tattered. The edges of the fins may
                  turn white, brown, or red as the infection progresses.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Red Streaks or Inflammation:</strong> Advanced stages
                  may show red streaks along the fins or base, indicating
                  inflammation and bacterial invasion.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Fin Loss:</strong> In severe cases, the fins can rot
                  away completely, leaving the fish vulnerable to further
                  infections and physical difficulties.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy:</strong> Affected fish may become less
                  active or show signs of reduced appetite due to the stress of
                  the infection.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Antibacterial Medication:</strong> Use a
                  broad-spectrum antibacterial treatment specifically formulated
                  for Fin Rot. Follow the dosage instructions carefully, as some
                  treatments can affect water quality.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Regularly check and
                  maintain optimal water parameters. Ensure ammonia, nitrite,
                  and nitrate levels are within safe ranges, and consider
                  partial water changes to reduce contamination.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Salt Baths:</strong> A salt bath can help relieve
                  stress and reduce the bacteria load. Use 1-3 grams of aquarium
                  salt per liter of water for 10-15 minutes as a bath treatment.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Remove Injured Fish:</strong> If the fish are
                  aggressive or frequently injured, consider isolating the
                  affected fish to prevent further injury or stress.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Water Maintenance:</strong> Clean the tank
                    or pond regularly and monitor water quality closely. Keep
                    the pH, ammonia, nitrite, and nitrate levels stable to
                    reduce the risk of bacterial growth.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Ensure the tank or pond
                    is not overcrowded, as this reduces stress and limits the
                    spread of bacterial infections.
                  </li>
                  <li>
                    <strong>Minimize Handling:</strong> Handle fish as little as
                    possible, and use soft nets or gloves when necessary to
                    avoid damaging the fins.
                  </li>
                  <li>
                    <strong>Quarantine New Fish:</strong> Always quarantine new
                    fish before adding them to the main pond or tank to prevent
                    introducing infections to healthy fish.
                  </li>
                </ul>
              </div>
              {/* section 3 */}
              <h4 className="text-xl font-semibold mt-6">3. Dropsy</h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Dropsy is a serious condition in fish characterized by swelling
                of the body, often caused by a variety of underlying issues,
                including infections, poor water quality, and organ failure. It
                is not a disease itself but a symptom of various health
                problems, typically leading to a poor prognosis if not addressed
                promptly.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Infections:</strong> Bacterial infections, such as{" "}
                    <em>Edwardsiella ictaluri</em> or <em>Aeromonas</em>{" "}
                    species, can lead to fluid accumulation in the body cavity.
                  </li>
                  <li>
                    <strong>Organ Failure:</strong> Damage to vital organs like
                    the kidneys or liver can cause dropsy due to the inability
                    to regulate bodily fluids.
                  </li>
                  <li>
                    <strong>Poor Water Quality:</strong> High levels of ammonia,
                    nitrites, or nitrates can stress fish and lead to dropsy.
                  </li>
                  <li>
                    <strong>Parasites:</strong> Infestations by parasites such
                    as flukes or protozoa can cause internal damage and fluid
                    buildup.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Swollen Abdomen:</strong> The most notable symptom of
                  dropsy is a visibly swollen abdomen, often giving the fish a
                  pinecone appearance as scales protrude.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Loss of Appetite:</strong> Affected fish may stop
                  eating or show decreased interest in food.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy:</strong> Fish may become less active and
                  show signs of fatigue.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Clamped Fins:</strong> Fins may be held close to the
                  body rather than extended.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Perform water changes
                  to ensure optimal water conditions and reduce stressors.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Antibiotics:</strong> Administer appropriate
                  antibacterial treatments if a bacterial infection is
                  suspected.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Isolate Affected Fish:</strong> Quarantine sick fish
                  to prevent the spread of potential infections to healthy
                  individuals.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Supportive Care:</strong> Provide a stress-free
                  environment, and consider adding salt to the water to help
                  with osmoregulation.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Water Testing:</strong> Monitor water
                    parameters regularly to prevent stress from poor water
                    quality.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Ensure proper stocking
                    levels to reduce stress and disease spread.
                  </li>
                  <li>
                    <strong>Quarantine New Fish:</strong> Always quarantine new
                    fish before introducing them to the main tank to prevent
                    disease transmission.
                  </li>
                  <li>
                    <strong>Balanced Diet:</strong> Provide a high-quality,
                    varied diet to maintain fish health and boost their immune
                    systems.
                  </li>
                </ul>
              </div>
              {/* section 4 */}
              <h4 className="text-xl font-semibold mt-6">4. Ulcers</h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Ulcers are a common and serious health issue in fish
                characterized by open sores or lesions on the skin or body. They
                often indicate underlying infections or stressors, and if left
                untreated, can lead to severe health complications and even
                death.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Bacterial Infections:</strong> Commonly caused by
                    bacteria such as <em>Aeromonas</em> and <em>Pseudomonas</em>
                    , which thrive in poor water conditions.
                  </li>
                  <li>
                    <strong>Parasitic Infestations:</strong> External parasites
                    can damage fish skin, leading to secondary bacterial
                    infections.
                  </li>
                  <li>
                    <strong>Injury or Stress:</strong> Physical injuries from
                    handling, aggressive tankmates, or environmental stressors
                    can predispose fish to ulcers.
                  </li>
                  <li>
                    <strong>Poor Water Quality:</strong> High levels of ammonia,
                    nitrites, and poor overall water conditions can weaken fish
                    health and promote ulcer formation.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Open Sores or Lesions:</strong> Visible sores on the
                  body or fins that can appear red, inflamed, and ooze fluid.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Swelling and Redness:</strong> Affected areas may
                  appear swollen and exhibit redness around the edges of the
                  ulcer.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy:</strong> Fish may become inactive and show
                  reduced appetite due to the pain and stress of the condition.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Clamped Fins:</strong> Fins may be held tightly
                  against the body instead of being extended.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Conduct regular water
                  changes and monitor water parameters to ensure optimal
                  conditions.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Antibacterial Treatment:</strong> Use broad-spectrum
                  antibacterial medications designed for fish to treat the
                  infection.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Isolation of Affected Fish:</strong> Quarantine
                  infected fish to prevent the spread of the condition to
                  healthy individuals.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Supportive Care:</strong> Provide a stress-free
                  environment, and consider using salt baths to aid healing and
                  reduce bacterial load.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Maintenance:</strong> Keep the aquarium or
                    pond clean and monitor water quality regularly to prevent
                    stress and infections.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Maintain a suitable
                    fish-to-water ratio to reduce stress and aggression.
                  </li>
                  <li>
                    <strong>Handle Fish Carefully:</strong> Minimize handling
                    and use proper techniques to avoid injuries.
                  </li>
                  <li>
                    <strong>Quarantine New Fish:</strong> Always quarantine new
                    arrivals to prevent the introduction of diseases.
                  </li>
                </ul>
              </div>
              {/* section 5 */}
              <h4 className="text-xl font-semibold mt-6">
                5. Swim Bladder Disorder
              </h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Swim Bladder Disorder is a condition that affects a fish's
                ability to control its buoyancy due to issues with the swim
                bladder. This disorder can manifest as floating at the surface,
                sinking to the bottom, or swimming in an abnormal manner. It can
                be caused by a variety of factors, including infections, dietary
                issues, or physical trauma.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Infections:</strong> Bacterial or parasitic
                    infections can inflame or damage the swim bladder.
                  </li>
                  <li>
                    <strong>Dietary Issues:</strong> Overfeeding or feeding
                    low-quality food can lead to constipation or gas buildup,
                    affecting buoyancy.
                  </li>
                  <li>
                    <strong>Physical Trauma:</strong> Injuries from aggressive
                    tankmates or rough handling can impact swim bladder
                    function.
                  </li>
                  <li>
                    <strong>Environmental Factors:</strong> Sudden changes in
                    water temperature, pH, or other water parameters can stress
                    fish and lead to swim bladder issues.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Abnormal Swimming:</strong> Fish may swim erratically,
                  struggle to maintain a vertical position, or float
                  uncontrollably.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Floating or Sinking:</strong> Some fish may float at
                  the surface, while others may sink to the bottom of the tank.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Swollen Abdomen:</strong> In some cases, the fish may
                  exhibit a bloated appearance, indicating potential internal
                  issues.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy:</strong> Affected fish may show reduced
                  activity levels and lack of interest in food.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Adjust Diet:</strong> Reduce feeding and switch to
                  high-quality, easily digestible food to alleviate constipation
                  or gas buildup.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Medications:</strong> Use appropriate treatments for
                  any underlying infections or parasites as needed.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Salt Baths:</strong> A salt bath can help reduce
                  stress and support healing, using 1-3 grams of aquarium salt
                  per liter of water for 10-15 minutes.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Provide a Stress-Free Environment:</strong> Ensure
                  that tank conditions are optimal and reduce any sources of
                  stress for the fish.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Balanced Diet:</strong> Feed fish a balanced diet
                    and avoid overfeeding to prevent digestive issues.
                  </li>
                  <li>
                    <strong>Regular Water Maintenance:</strong> Maintain stable
                    water parameters and perform regular water changes to ensure
                    a healthy environment.
                  </li>
                  <li>
                    <strong>Avoid Aggressive Fish:</strong> Choose compatible
                    tank mates to reduce the risk of injury.
                  </li>
                  <li>
                    <strong>Monitor Fish Behavior:</strong> Keep an eye on your
                    fish for any signs of stress or illness and act promptly if
                    issues arise.
                  </li>
                </ul>
              </div>
              {/* section 6 */}
              <h4 className="text-xl font-semibold mt-6">
                6. Flukes (Gill and Skin Flukes)
              </h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Flukes are flat, leaf-shaped parasites that attach to the gills
                and skin of fish, causing irritation and potential damage. They
                can significantly impact the health of affected fish by
                interfering with their respiratory and osmoregulatory functions.
                Flukes can be found in both freshwater and saltwater
                environments and often thrive in poorly maintained water
                conditions.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Parasitic Infection:</strong> Flukes are caused by
                    various species of trematodes, which can enter the fish's
                    body through the skin or gills.
                  </li>
                  <li>
                    <strong>Poor Water Quality:</strong> Dirty or unmaintained
                    water can facilitate the proliferation of flukes, increasing
                    the risk of infection.
                  </li>
                  <li>
                    <strong>Stress Factors:</strong> Stress from overcrowding,
                    poor diet, or abrupt changes in water conditions can weaken
                    fish and make them more susceptible to fluke infestations.
                  </li>
                  <li>
                    <strong>Introduction of Infected Fish:</strong> Adding new
                    fish to a tank without proper quarantine can introduce fluke
                    parasites.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Scratching and Flashing:</strong> Affected fish may
                  rub their bodies against objects in the tank or flash at the
                  water surface to relieve irritation.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Labored Breathing:</strong> Fish may exhibit
                  difficulty breathing or gasping at the water surface due to
                  gill irritation.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Inflamed Skin or Gills:</strong> Visible redness,
                  swelling, or lesions on the skin or gills may be present.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy and Loss of Appetite:</strong> Infected fish
                  may become less active and show a reduced desire to eat.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Anti-Parasitic Medications:</strong> Use specific
                  treatments designed to eliminate flukes, following the
                  manufacturer's instructions carefully.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Increase Water Temperature:</strong> Gradually raising
                  the water temperature can help accelerate the life cycle of
                  flukes, making them more susceptible to treatments.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Regular maintenance
                  and monitoring of water parameters can help reduce stress and
                  susceptibility to infections.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Quarantine New Fish:</strong> Always quarantine new
                  fish before introducing them to the main tank to prevent
                  introducing parasites.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Water Maintenance:</strong> Keep the tank or
                    pond clean and monitor water quality parameters closely.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Ensure adequate space
                    for fish to reduce stress and the risk of infection.
                  </li>
                  <li>
                    <strong>Healthy Diet:</strong> Provide a balanced diet to
                    boost the immune system of your fish.
                  </li>
                  <li>
                    <strong>Regular Health Checks:</strong> Monitor fish
                    regularly for signs of stress or disease and act promptly if
                    issues arise.
                  </li>
                </ul>
              </div>
              {/* section 7 */}
              <h4 className="text-xl font-semibold mt-6">
                7. Costia (Ichthyobodo)
              </h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Costia, caused by the protozoan parasite{" "}
                <em>Ichthyobodo necator</em>, primarily affects freshwater fish
                and can lead to significant health issues if not treated
                promptly. This parasite primarily targets the skin and gills of
                fish, causing irritation and can lead to secondary infections.
                Costia outbreaks are often linked to poor water quality and
                stress in fish.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Parasitic Infection:</strong> Costia is caused by
                    the protozoan parasite <em>Ichthyobodo necator</em>, which
                    thrives in stressed or unhealthy fish.
                  </li>
                  <li>
                    <strong>Poor Water Quality:</strong> High levels of ammonia,
                    nitrites, or organic waste can create an environment
                    conducive to Costia infections.
                  </li>
                  <li>
                    <strong>Stress Factors:</strong> Factors such as
                    overcrowding, sudden changes in water temperature, or poor
                    nutrition can increase the susceptibility of fish to
                    infection.
                  </li>
                  <li>
                    <strong>Introduction of Infected Fish:</strong> New fish
                    added to a tank without proper quarantine can introduce the
                    parasite.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Excessive Mucus Production:</strong> Affected fish may
                  have a cloudy appearance due to increased mucus production,
                  making them look 'dusty.'
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Skin Irritation and Inflammation:</strong> Visible
                  redness and irritation on the skin, along with potential
                  lesions.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Labored Breathing:</strong> Fish may exhibit
                  difficulty breathing and may spend more time near the water
                  surface.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy and Loss of Appetite:</strong> Infected fish
                  often become less active and show a reduced interest in food.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Anti-Parasitic Medications:</strong> Specific
                  treatments targeting protozoan parasites, such as formalin or
                  copper-based medications, should be used as directed.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Regularly monitor and
                  maintain optimal water conditions to reduce stress and promote
                  healing.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Increase Water Temperature:</strong> Gradually raising
                  the water temperature can help enhance the effectiveness of
                  treatments by speeding up the parasite's life cycle.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Isolate Infected Fish:</strong> Quarantine affected
                  fish to prevent the spread of the parasite to healthy
                  individuals.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Water Maintenance:</strong> Keep the tank or
                    pond clean and regularly check water parameters.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Provide adequate space
                    for fish to minimize stress and prevent outbreaks.
                  </li>
                  <li>
                    <strong>Quarantine New Fish:</strong> Always quarantine new
                    fish for at least two weeks before introducing them to the
                    main tank or pond.
                  </li>
                  <li>
                    <strong>Stress Management:</strong> Implement practices to
                    reduce stress in fish, such as proper tank mates and
                    environmental enrichment.
                  </li>
                </ul>
              </div>
              {/* section 8 */}
              <h4 className="text-xl font-semibold mt-6">
                8. Anchor Worms (Lernaea)
              </h4>

              <h5 className="text-lg font-medium mb-4 mt-2">Overview</h5>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Anchor worms, caused by the copepod parasite <em>Lernaea</em>,
                are a common affliction in freshwater fish, particularly in koi
                and goldfish. This parasite attaches itself to the fish's skin,
                fins, or gills, causing irritation and potential secondary
                infections. If not addressed promptly, anchor worms can lead to
                serious health issues for the affected fish.
              </p>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Cause:</p>
                <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Parasitic Infection:</strong> Anchor worms are
                    caused by the copepod parasite <em>Lernaea</em>, which
                    attaches to fish and feeds on their blood and tissue.
                  </li>
                  <li>
                    <strong>Stress Factors:</strong> Fish that are stressed due
                    to poor water conditions or overcrowding are more
                    susceptible to infestations.
                  </li>
                  <li>
                    <strong>Introduction of Infected Fish:</strong> New fish
                    added to a tank or pond without proper quarantine can
                    introduce anchor worms.
                  </li>
                  <li>
                    <strong>Environmental Conditions:</strong> Poorly maintained
                    tanks or ponds can provide a suitable environment for
                    parasites to thrive.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Symptoms:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Visible Worms:</strong> Small, greenish or white worms
                  may be seen attached to the fish's skin or fins.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Skin Irritation:</strong> Affected areas may show
                  signs of redness, swelling, or irritation due to the
                  parasite's feeding.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Behavioral Changes:</strong> Fish may exhibit
                  increased scratching against surfaces or show signs of
                  discomfort.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Lethargy and Loss of Appetite:</strong> Infected fish
                  may become less active and show a reduced interest in food.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Treatment:</p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Anti-Parasitic Treatments:</strong> Use specific
                  medications designed to target copepod parasites, such as
                  praziquantel or formalin.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Manual Removal:</strong> If practical, carefully
                  remove visible anchor worms using tweezers or forceps while
                  ensuring not to harm the fish.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Improve Water Quality:</strong> Regularly monitor and
                  maintain optimal water parameters to reduce stress and promote
                  healing.
                </p>
                <p className="ml-6 text-gray-700 leading-relaxed mb-4">
                  <strong>Isolate Infected Fish:</strong> Quarantine affected
                  fish to prevent the spread of anchor worms to healthy
                  individuals.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-blue-800 font-semibold">Prevention:</p>
                <ul className="list-disc list-inside ml-4 text-lg text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Regular Water Maintenance:</strong> Keep the tank or
                    pond clean and monitor water parameters regularly.
                  </li>
                  <li>
                    <strong>Avoid Overcrowding:</strong> Ensure adequate space
                    for fish to minimize stress and the risk of parasite
                    outbreaks.
                  </li>
                  <li>
                    <strong>Quarantine New Fish:</strong> Always quarantine new
                    fish for at least two weeks before introducing them to the
                    main tank or pond.
                  </li>
                  <li>
                    <strong>Stress Management:</strong> Implement practices to
                    reduce stress in fish, such as proper tank mates and
                    environmental enrichment.
                  </li>
                </ul>
              </div>

              <h4 className="text-xl font-semibold mt-4">Prevention Tips</h4>
              <ul className="list-disc list-inside">
                <li>Regularly monitor water parameters.</li>
                <li>Avoid overcrowding to reduce stress.</li>
                <li>Quarantine new fish before adding them.</li>
                <li>Perform regular water changes and maintain cleanliness.</li>
                <li>Contact Us to booking appointment</li>
              </ul>
            </div>
          )}
        </article>
      </section>

      <Footer />
    </>
  );
};

export default FAQ_Q1;
