window.onload = loadExample;

function loadExample() {

    document.getElementById("a00").value = 10;
    document.getElementById("a01").value = 2;
    document.getElementById("a02").value = 5;

    document.getElementById("a10").value = 8;
    document.getElementById("a11").value = 5;
    document.getElementById("a12").value = 3;

    document.getElementById("a20").value = 12;
    document.getElementById("a21").value = 1;
    document.getElementById("a22").value = 8;

    document.getElementById("b0").value = 15;
    document.getElementById("b1").value = 34;
    document.getElementById("b2").value = 22;

    document.getElementById("result").innerHTML = "";
}

function resetForm() {

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    document.getElementById("result").innerHTML = "";
}

function printResults() {

    if (document.getElementById("result").innerHTML === "") {
        alert("Please solve the system first.");
        return;
    }

    window.print();
}

function solveSystem() {

    const A = [

        [Number(a00.value), Number(a01.value), Number(a02.value)],
        [Number(a10.value), Number(a11.value), Number(a12.value)],
        [Number(a20.value), Number(a21.value), Number(a22.value)]

    ];

    const B = [

        Number(b0.value),
        Number(b1.value),
        Number(b2.value)

    ];

    if (A.flat().some(isNaN) || B.some(isNaN)) {

        result.innerHTML =
        "<p class='error'>Please complete all inputs.</p>";

        return;
    }

    const det =
        A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])
        - A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])
        + A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);

    if(det === 0){

        result.innerHTML =
        "<p class='error'>Determinant = 0. No Unique Solution Exists.</p>";

        return;
    }

    const cof = [

        [
            A[1][1]*A[2][2]-A[1][2]*A[2][1],
            -(A[1][0]*A[2][2]-A[1][2]*A[2][0]),
            A[1][0]*A[2][1]-A[1][1]*A[2][0]
        ],

        [
            -(A[0][1]*A[2][2]-A[0][2]*A[2][1]),
            A[0][0]*A[2][2]-A[0][2]*A[2][0],
            -(A[0][0]*A[2][1]-A[0][1]*A[2][0])
        ],

        [
            A[0][1]*A[1][2]-A[0][2]*A[1][1],
            -(A[0][0]*A[1][2]-A[0][2]*A[1][0]),
            A[0][0]*A[1][1]-A[0][1]*A[1][0]
        ]
    ];

    const adj = [

        [cof[0][0], cof[1][0], cof[2][0]],
        [cof[0][1], cof[1][1], cof[2][1]],
        [cof[0][2], cof[1][2], cof[2][2]]
    ];

    const inverse = [];

    for(let i=0;i<3;i++){

        inverse[i]=[];

        for(let j=0;j<3;j++){

            inverse[i][j]=adj[i][j]/det;
        }
    }

    const X=[];

    for(let i=0;i<3;i++){

        let sum=0;

        for(let j=0;j<3;j++){

            sum += inverse[i][j]*B[j];
        }

        X[i]=sum;
    }

    const bw = X[0];
    const color = X[1];
    const photo = X[2];

    const studentA = 10*bw + 2*color + 5*photo;
    const studentB = 8*bw + 5*color + 3*photo;
    const studentC = 12*bw + color + 8*photo;

    document.getElementById("result").innerHTML = `

    <div class="card">

        <h3>Step 1: Determinant Solution</h3>

        <p><strong>Given the Coefficient Matrix A:</strong></p>

        <pre>
    | 10   2   5 |
    |  8   5   3 |
    | 12   1   8 |
        </pre>

        <p>
        The determinant of a 3×3 matrix is:
        </p>

        <p>
        det(A) =
        a₁₁(a₂₂a₃₃ − a₂₃a₃₂)
        − a₁₂(a₂₁a₃₃ − a₂₃a₃₁)
        + a₁₃(a₂₁a₃₂ − a₂₂a₃₁)
        </p>

        <p><strong>Substitute the values:</strong></p>

        <p>
        det(A) =
        10[(5)(8) − (3)(1)]
        − 2[(8)(8) − (3)(12)]
        + 5[(8)(1) − (5)(12)]
        </p>

        <p>
        = 10(40 − 3)
        − 2(64 − 36)
        + 5(8 − 60)
        </p>

        <p>
        = 10(37)
        − 2(28)
        + 5(-52)
        </p>

        <p>
        = 370 − 56 − 260
        </p>

        <p>
        = <strong>${det}</strong>
        </p>

        <p class="result-price">
        Therefore, det(A) = ${det}
        </p>

        <p>
        Since det(A) ≠ 0, the inverse matrix exists and a unique solution can be obtained.
        </p>

    </div>

    <div class="card">

        <h3>Step 2: Finding the Inverse Matrix A⁻¹</h3>

        <p>
        Formula:
        </p>

        <p>
        A⁻¹ = (1 / det(A)) × adj(A)
        </p>

        <p>
        Since:
        </p>

        <p>
        det(A) = ${det}
        </p>

        <h4>2.1 Cofactor Matrix</h4>

        <table>
            <tr>
                <td>${cof[0][0]}</td>
                <td>${cof[0][1]}</td>
                <td>${cof[0][2]}</td>
            </tr>
            <tr>
                <td>${cof[1][0]}</td>
                <td>${cof[1][1]}</td>
                <td>${cof[1][2]}</td>
            </tr>
            <tr>
                <td>${cof[2][0]}</td>
                <td>${cof[2][1]}</td>
                <td>${cof[2][2]}</td>
            </tr>
        </table>

        <br>

        <h4>2.2 Adjugate Matrix (Transpose of Cofactor Matrix)</h4>

        <table>
            <tr>
                <td>${adj[0][0]}</td>
                <td>${adj[0][1]}</td>
                <td>${adj[0][2]}</td>
            </tr>
            <tr>
                <td>${adj[1][0]}</td>
                <td>${adj[1][1]}</td>
                <td>${adj[1][2]}</td>
            </tr>
            <tr>
                <td>${adj[2][0]}</td>
                <td>${adj[2][1]}</td>
                <td>${adj[2][2]}</td>
            </tr>
        </table>

        <br>

        <h4>2.3 Inverse Matrix</h4>

        <p>
        Divide every element of the adjugate matrix by det(A):
        </p>

        <p>
        A⁻¹ = (1/${det}) × adj(A)
        </p>

        <table>
            <tr>
                <td>${inverse[0][0].toFixed(4)}</td>
                <td>${inverse[0][1].toFixed(4)}</td>
                <td>${inverse[0][2].toFixed(4)}</td>
            </tr>
            <tr>
                <td>${inverse[1][0].toFixed(4)}</td>
                <td>${inverse[1][1].toFixed(4)}</td>
                <td>${inverse[1][2].toFixed(4)}</td>
            </tr>
            <tr>
                <td>${inverse[2][0].toFixed(4)}</td>
                <td>${inverse[2][1].toFixed(4)}</td>
                <td>${inverse[2][2].toFixed(4)}</td>
            </tr>
        </table>

    </div>

<div class="card success">

    <h3>Step 3: Service Prices (X = A⁻¹B)</h3>

    <p class="result-price">
    x₁ Black & White Print = ₱${bw.toFixed(2)}
    </p>

    <p class="result-price">
    x₂ Colored Print = ₱${color.toFixed(2)}
    </p>

    <p class="result-price">
    x₃ Photocopy = ₱${photo.toFixed(2)}
    </p>

    ${
        (bw < 0 || color < 0 || photo < 0)
        ?
        `
        <div style="
            margin-top:15px;
            padding:10px;
            background:#fff3cd;
            border-left:5px solid orange;
            border-radius:5px;">
            
            ⚠️ One or more prices are negative.
            This means the entered totals may not represent a realistic printing shop scenario.
        </div>
        `
        :
        `
        <div style="
            margin-top:15px;
            padding:10px;
            background:#d4edda;
            border-left:5px solid green;
            border-radius:5px;">

            All prices are positive and realistic.
        </div>
        `
    }

</div>

    <div class="card">

        <h3>Order Verification</h3>

        <p>Student A Total = ₱${studentA.toFixed(2)}</p>

        <p>Student B Total = ₱${studentB.toFixed(2)}</p>

        <p>Student C Total = ₱${studentC.toFixed(2)}</p>

    </div>

    <div class="card success">

        <h3>Step 3: Service Prices (X = A⁻¹B)</h3>

        <p class="result-price">
        x₁ Black & White Print = ₱${bw.toFixed(2)}
        </p>

        <p class="result-price">
        x₂ Colored Print = ₱${color.toFixed(2)}
        </p>

        <p class="result-price">
        x₃ Photocopy = ₱${photo.toFixed(2)}
        </p>

        ${
            (bw < 0 || color < 0 || photo < 0)
            ?
            `
            <div style="
                margin-top:15px;
                padding:10px;
                background:#fff3cd;
                border-left:5px solid orange;
                border-radius:5px;">
                
                ⚠️ One or more prices are negative.
                This means the entered totals may not represent a realistic printing shop scenario.
            </div>
            `
            :
            `
            <div style="
                margin-top:15px;
                padding:10px;
                background:#d4edda;
                border-left:5px solid green;
                border-radius:5px;">

                ✅ All prices are positive and realistic.
            </div>
            `
        }

    </div>

    `;
}