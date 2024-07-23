from flask import Flask, request, jsonify, session
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'proyecto'

CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3002"}}, supports_credentials=True)
CORS(app, resources={r"/*/*": {"origins": "http://127.0.0.1:3002"}},supports_credentials=True)

mySql = MySQL(app)

def VerificarExistencia_u(correo):
    try:
        cursor = mySql.connection.cursor()
        cursor.execute("SELECT email FROM usuarios WHERE email = %s", (correo,))
        user = cursor.fetchone()
        cursor.close()
        
        if user:
            return True
        else:
            return False
    except Exception as e:
        print("Error al verificar la existencia del correo:", e)
        return False

def InsertInTable_U(datos):
    try:
        cursor = mySql.connection.cursor()
        
        cursor.execute("""
            INSERT INTO usuarios (nombre, apellido, email, contraseña, rol) 
            VALUES (%s, %s, %s, %s,%s)
        """, datos)
        
        mySql.connection.commit()
        cursor.close()
        
        print("Datos insertados correctamente.")
        return True

    except Exception as e:
        print("Error al insertar datos:", e)
        return False

def Verificar_u(email, password):
    try:
        cursor = mySql.connection.cursor()
        cursor.execute("SELECT nombre,apellido,email,contraseña,rol FROM usuarios WHERE email = %s AND contraseña = %s", (email, password))
        user = cursor.fetchone()
        cursor.close()
        
        return user
    except Exception as e:
        print("Error al verificar las credenciales:", e)
        return False

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        email = data.get('email')
        contra = data.get('contra')
        rol=data.get('rol')
        
        if VerificarExistencia_u(email):
            return jsonify(success=False, message="Las credenciales usadas ya se encuentran registradas.")
        else:
            datos = (nombre, apellido, email, contra,rol)
            if InsertInTable_U(datos):
                return jsonify(success=True, message="Se ha registrado de manera exitosa.")
            else:
                return jsonify(success=False, message="Ocurrió un error al registrar los datos.")
    except Exception as e:
        print(e)
        return jsonify(success=False, message="Error interno del servidor.")
    
@app.route('/valiDato', methods=['POST'])
def validate():
    try:
        data = request.get_json()
        email = data.get('email')
        contra = data.get('contra')
        print(email,contra)
        
        user = Verificar_u(email, contra)
        
        if user: 
            return jsonify(success=True, message="Inicio de sesion exitoso",nombre=user[0],apellido=user[1],email=user[2],rol=user[4])
        
        else:
            return jsonify(success=False, message="Correo electrónico o contraseña incorrectos.")
    except Exception as e:
        print(e)
        return jsonify(success=False, message="Error interno del servidor.")

@app.route('/getAll', methods=['GET'])
def getAll():
    try:
        cur = mySql.connection.cursor()
        cur.execute("SELECT * FROM usuarios")
        
        results = cur.fetchall()
        payload = []
        print(results)

        for i in results:
            content = {"id": i[0], "nombre": i[1], "apellido":i[2], "email": i[3], "contraseña": i[4],"rol": i[5] }
            payload.append(content)
        cur.close()
        return jsonify({"Usuarios": payload})
    
    except Exception as e:
        print(e)
        return jsonify(success=False,message="Error al obtener usuarios desde la base de datos.")
    
@app.route('/getAll/<id>', methods=['GET'])
def getAllById(id):
    try:
        cur = mySql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE id = %s', (id,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        for i in rv:
            content = {
                "id": i[0],
                "nombre": i[1],
                "apellido": i[2],
                "email": i[3],
                "contraseña": i[4],
                "rol": i[5]
            }
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

    
@app.route('/editUser/<user_id>', methods=['PUT'])
def editUser(user_id):
    try:
        cur = mySql.connection.cursor()
        data = request.get_json()

        nombre = data.get('nombre')
        apellido = data.get('apellido')
        email = data.get('email')
        contraseña = data.get('contraseña')
        rol = data.get('rol')

        cur.execute("""
            UPDATE usuarios
            SET nombre = %s, apellido = %s, email = %s, contraseña = %s, rol = %s
            WHERE id = %s
        """, (nombre, apellido, email, contraseña, rol, user_id))
        
        mySql.connection.commit()
        cur.close()

        return jsonify(success=True, message=f"Usuario con ID {user_id} actualizado correctamente")

    except Exception as e:
        print(e)
        return jsonify(success=False, message="Error al actualizar el usuario"), 500

@app.route('/user-stats', methods=['GET'])
def user_stats():
    try:
        cur = mySql.connection.cursor()
        cur.execute('''
            SELECT rol, COUNT(*) as cantidad
            FROM usuarios
            GROUP BY rol
        ''')
        results = cur.fetchall()
        cur.close()

        # Preparar datos para la gráfica
        roles = []
        counts = []

        for row in results:
            roles.append(row[0])
            counts.append(row[1])

        return jsonify({
            'roles': roles,
            'counts': counts
        })
    except Exception as e:
        print(e)
        return jsonify(success=False, message="Error al obtener estadísticas de usuarios."), 500


if __name__ == '__main__':
    app.run(debug=True)




