-- CreateTable
CREATE TABLE "asesor" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100),
    "apellido" VARCHAR(100),
    "nombre" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "fecha_ingreso" DATE,
    "inscripto_iva" BOOLEAN,
    "cuit" VARCHAR(20),
    "email" VARCHAR(100),
    "interno_externo" VARCHAR(20),
    "contrasena" VARCHAR(100),

    CONSTRAINT "asesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asesor_coordinador" (
    "id" SERIAL NOT NULL,
    "asesor_id" INTEGER,
    "coordinador_id" INTEGER,

    CONSTRAINT "asesor_coordinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "apellido" VARCHAR(100),
    "tipo_persona" VARCHAR(50),
    "cuit" VARCHAR(20),
    "fecha_inicio_actividades" DATE,
    "direccion" VARCHAR(200),
    "codigo_postal" VARCHAR(20),
    "provincia" VARCHAR(100),
    "localidad" VARCHAR(100),
    "telefono" VARCHAR(20),
    "email" VARCHAR(100),
    "compania" VARCHAR(100),
    "numero_cuenta" INTEGER,
    "fecha_creacion" DATE,
    "observacion" TEXT,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comisiones" (
    "id" SERIAL NOT NULL,
    "v_manager_manager" DECIMAL(10,2),
    "v_manager_coordinador" DECIMAL(10,2),
    "v_manager_asesor" DECIMAL(10,2),
    "v_coordinador_manager" DECIMAL(10,2),
    "v_coordinador_coordinador" DECIMAL(10,2),
    "v_coordinador_asesor" DECIMAL(10,2),
    "v_asesor_manager" DECIMAL(10,2),
    "v_asesor_coordinador" DECIMAL(10,2),
    "v_asesor_asesor" DECIMAL(10,2),
    "id_compania" INTEGER,
    "manager_id" INTEGER,
    "v_asesor_sc_manager" DECIMAL(10,2),
    "v_asesor_sc_asesor" DECIMAL(10,2),

    CONSTRAINT "comisiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinador" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100),
    "apellido" VARCHAR(100),
    "nombre" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "fecha_ingreso" DATE,
    "inscripto_iva" BOOLEAN,
    "cuit" VARCHAR(20),
    "email" VARCHAR(100),
    "interno_externo" VARCHAR(20),
    "contrasena" VARCHAR(100),

    CONSTRAINT "coordinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20),

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipo_empresa" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER,
    "manager_id" INTEGER,

    CONSTRAINT "equipo_empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100),
    "apellido" VARCHAR(100),
    "nombre" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "fecha_ingreso" DATE,
    "inscripto_iva" BOOLEAN,
    "cuit" VARCHAR(20),
    "email" VARCHAR(100),
    "interno_externo" VARCHAR(20),
    "contrasena" VARCHAR(100),

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relacion_cliente_asesor" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "asesor_id" INTEGER,
    "coordinador_id" INTEGER,
    "manager_id" INTEGER,

    CONSTRAINT "relacion_cliente_asesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "periodo" DATE,
    "archivo_a" VARCHAR(500),
    "archivo_b" VARCHAR(500),
    "archivo_c" VARCHAR(500),
    "estado" BOOLEAN,
    "fecha_pago" DATE,
    "total" INTEGER,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asesor_manager" (
    "id" SERIAL NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "asesor_id" INTEGER,
    "coordinador_id" INTEGER,

    CONSTRAINT "asesor_manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aranceles" (
    "id" SERIAL NOT NULL,
    "numero_cuenta" INTEGER,
    "cliente" VARCHAR(255),
    "tipo_de_arance" VARCHAR(255),
    "prima" DECIMAL(10,2),
    "porcentaje_comi" INTEGER,
    "prima_desc" DECIMAL(10,2),
    "total" DECIMAL(10,2),
    "periodo_id" INTEGER,

    CONSTRAINT "aranceles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aranceles_publicos" (
    "id" SERIAL NOT NULL,
    "numero_cuenta" INTEGER,
    "cliente" VARCHAR(255),
    "prima" DECIMAL(10,2),
    "porcentaje_comi" INTEGER,
    "prima_desc" DECIMAL(10,2),
    "tipo_de_cambio" INTEGER,
    "total" DECIMAL(10,2),
    "periodo_id" INTEGER,

    CONSTRAINT "aranceles_publicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fondos" (
    "id" SERIAL NOT NULL,
    "numero_cuenta" INTEGER,
    "cliente" VARCHAR(255),
    "prima" DECIMAL(10,2),
    "porcentaje_comi" INTEGER,
    "prima_desc" DECIMAL(10,2),
    "total" DECIMAL(10,2),
    "periodo_id" INTEGER,

    CONSTRAINT "fondos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liquidacion_aranceles" (
    "id" SERIAL NOT NULL,
    "liquidacion_id" INTEGER,
    "arancel_id" INTEGER,

    CONSTRAINT "liquidacion_aranceles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liquidacion_aranceles_p" (
    "id" SERIAL NOT NULL,
    "liquidacion_id" INTEGER,
    "arancel_publico_id" INTEGER,

    CONSTRAINT "liquidacion_aranceles_p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liquidacion_fondos" (
    "id" SERIAL NOT NULL,
    "liquidacion_id" INTEGER,
    "fondo_id" INTEGER,

    CONSTRAINT "liquidacion_fondos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liquidaciones" (
    "id" SERIAL NOT NULL,
    "asesor_id" INTEGER,
    "coordinador_id" INTEGER,
    "manager_id" INTEGER,
    "periodo_id" INTEGER,
    "estado" VARCHAR(255),
    "fecha_pago" DATE,

    CONSTRAINT "liquidaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos" (
    "id" SERIAL NOT NULL,
    "fecha_creacion" DATE,
    "compañia_id" INTEGER,

    CONSTRAINT "periodos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_numero_cuenta" ON "cliente"("numero_cuenta");

-- AddForeignKey
ALTER TABLE "asesor_coordinador" ADD CONSTRAINT "asesor_coordinador_asesor_id_fkey" FOREIGN KEY ("asesor_id") REFERENCES "asesor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "asesor_coordinador" ADD CONSTRAINT "asesor_coordinador_coordinador_id_fkey" FOREIGN KEY ("coordinador_id") REFERENCES "coordinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comisiones" ADD CONSTRAINT "comisiones_id_compania_fkey" FOREIGN KEY ("id_compania") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comisiones" ADD CONSTRAINT "id_manager" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipo_empresa" ADD CONSTRAINT "equipo_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipo_empresa" ADD CONSTRAINT "id_manager" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relacion_cliente_asesor" ADD CONSTRAINT "relacion_cliente_asesor_asesor_id_fkey" FOREIGN KEY ("asesor_id") REFERENCES "asesor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relacion_cliente_asesor" ADD CONSTRAINT "relacion_cliente_asesor_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relacion_cliente_asesor" ADD CONSTRAINT "relacion_cliente_asesor_coordinador_id_fkey" FOREIGN KEY ("coordinador_id") REFERENCES "coordinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relacion_cliente_asesor" ADD CONSTRAINT "relacion_cliente_asesor_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "asesor_manager" ADD CONSTRAINT "asesor_manager_asesor_id_fkey" FOREIGN KEY ("asesor_id") REFERENCES "asesor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "asesor_manager" ADD CONSTRAINT "asesor_manager_coordinador_id_fkey" FOREIGN KEY ("coordinador_id") REFERENCES "coordinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "asesor_manager" ADD CONSTRAINT "asesor_manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aranceles" ADD CONSTRAINT "aranceles_cliente_fkey" FOREIGN KEY ("numero_cuenta") REFERENCES "cliente"("numero_cuenta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aranceles" ADD CONSTRAINT "aranceles_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "periodos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aranceles_publicos" ADD CONSTRAINT "aranceles_publicos_numero_cuenta_fkey" FOREIGN KEY ("numero_cuenta") REFERENCES "cliente"("numero_cuenta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aranceles_publicos" ADD CONSTRAINT "aranceles_publicos_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "periodos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fondos" ADD CONSTRAINT "fondos_numero_cuenta_fkey" FOREIGN KEY ("numero_cuenta") REFERENCES "cliente"("numero_cuenta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fondos" ADD CONSTRAINT "fondos_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "periodos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_aranceles" ADD CONSTRAINT "liquidacion_aranceles_arancel_id_fkey" FOREIGN KEY ("arancel_id") REFERENCES "aranceles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_aranceles" ADD CONSTRAINT "liquidacion_aranceles_liquidacion_id_fkey" FOREIGN KEY ("liquidacion_id") REFERENCES "liquidaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_aranceles_p" ADD CONSTRAINT "liquidacion_aranceles_p_arancel_publico_id_fkey" FOREIGN KEY ("arancel_publico_id") REFERENCES "aranceles_publicos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_aranceles_p" ADD CONSTRAINT "liquidacion_aranceles_p_liquidacion_id_fkey" FOREIGN KEY ("liquidacion_id") REFERENCES "liquidaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_fondos" ADD CONSTRAINT "liquidacion_fondos_fondo_id_fkey" FOREIGN KEY ("fondo_id") REFERENCES "fondos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidacion_fondos" ADD CONSTRAINT "liquidacion_fondos_liquidacion_id_fkey" FOREIGN KEY ("liquidacion_id") REFERENCES "liquidaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidaciones" ADD CONSTRAINT "liquidaciones_asesor_id_fkey" FOREIGN KEY ("asesor_id") REFERENCES "asesor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidaciones" ADD CONSTRAINT "liquidaciones_coordinador_id_fkey" FOREIGN KEY ("coordinador_id") REFERENCES "coordinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidaciones" ADD CONSTRAINT "liquidaciones_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "liquidaciones" ADD CONSTRAINT "liquidaciones_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "periodos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "periodos" ADD CONSTRAINT "periodos_id_fkey" FOREIGN KEY ("id") REFERENCES "empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
