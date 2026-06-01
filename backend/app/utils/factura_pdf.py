from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image
)

from reportlab.lib import colors

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import letter

from reportlab.platypus.flowables import HRFlowable

from reportlab.lib.enums import TA_CENTER

from reportlab.lib.styles import ParagraphStyle

import qrcode

import os

from datetime import datetime

def generar_factura_pdf(
    venta,
    cliente,
    vehiculo
):

    carpeta = "facturas"

    if not os.path.exists(carpeta):

        os.makedirs(carpeta)

    codigo_factura = (
        f"F-2026-{venta.id_venta:04}"
    )

    nombre_archivo = (
        f"{carpeta}/{codigo_factura}.pdf"
    )

    # QR

    qr_data = f"""
    FACTURA: {codigo_factura}
    CLIENTE: {cliente.nombre}
    VEHICULO: {vehiculo.modelo}
    TOTAL: {venta.total}
    """

    qr = qrcode.make(qr_data)

    qr_path = f"{carpeta}/qr_{venta.id_venta}.png"

    qr.save(qr_path)

    pdf = SimpleDocTemplate(

        nombre_archivo,

        pagesize=letter,

        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()

    elementos = []

    # ESTILO TITULO

    titulo_style = ParagraphStyle(

        name="Titulo",

        parent=styles["Heading1"],

        alignment=TA_CENTER,

        textColor=colors.HexColor("#0047AB"),

        fontSize=24,

        leading=30
    )

    # LOGO

    logo_path = "app/assets/chevrolet_logo.png"

    if os.path.exists(logo_path):

        logo = Image(
            logo_path,
            width=180,
            height=60
        )

        elementos.append(logo)

    elementos.append(Spacer(1,20))

    # TITULO

    titulo = Paragraph(

        f"<b>FACTURA {codigo_factura}</b>",

        titulo_style
    )

    elementos.append(titulo)

    elementos.append(Spacer(1,10))

    fecha = datetime.now().strftime(
        "%d/%m/%Y %H:%M"
    )

    fecha_parrafo = Paragraph(

        f"<b>Fecha:</b> {fecha}",

        styles["BodyText"]
    )

    elementos.append(fecha_parrafo)

    elementos.append(Spacer(1,15))

    elementos.append(HRFlowable())

    elementos.append(Spacer(1,15))

    # CLIENTE

    cliente_info = Paragraph(

        f"""
        <b>DATOS CLIENTE</b><br/><br/>

        <b>Nombre:</b> {cliente.nombre}<br/>
        <b>Correo:</b> {cliente.correo}<br/>
        <b>Teléfono:</b> {cliente.telefono}<br/>
        <b>Dirección:</b> {cliente.direccion}<br/>
        """,

        styles["BodyText"]
    )

    elementos.append(cliente_info)

    elementos.append(Spacer(1,20))

    # VEHICULO

    vehiculo_info = Paragraph(

        f"""
        <b>DATOS VEHÍCULO</b><br/><br/>

        <b>Modelo:</b> {vehiculo.modelo}<br/>
        <b>Marca:</b> {vehiculo.marca}<br/>
        <b>Año:</b> {vehiculo.anio}<br/>
        <b>Color:</b> {vehiculo.color}<br/>
        """,

        styles["BodyText"]
    )

    elementos.append(vehiculo_info)

    elementos.append(Spacer(1,20))

    subtotal = float(vehiculo.precio)

    iva = subtotal * 0.19

    total = round(subtotal + iva, 2)

    # TABLA

    data = [

        [
            "Descripción",
            "Cantidad",
            "Valor"
        ],

        [
            vehiculo.modelo,
            "1",
            f"${subtotal:,.0f}"
        ],

        [
            "",
            "SUBTOTAL",
            f"${subtotal:,.0f}"
        ],

        [
            "",
            "IVA 19%",
            f"${iva:,.0f}"
        ],

        [
            "",
            "TOTAL",
            f"${total:,.0f}"
        ]
    ]

    tabla = Table(

        data,

        colWidths=[250,120,120]
    )

    tabla.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0,0),
                (-1,0),
                colors.HexColor("#0047AB")
            ),

            (
                "TEXTCOLOR",
                (0,0),
                (-1,0),
                colors.white
            ),

            (
                "FONTNAME",
                (0,0),
                (-1,0),
                "Helvetica-Bold"
            ),

            (
                "GRID",
                (0,0),
                (-1,-1),
                1,
                colors.black
            ),

            (
                "BACKGROUND",
                (0,1),
                (-1,-1),
                colors.whitesmoke
            ),

            (
                "FONTNAME",
                (1,-1),
                (-1,-1),
                "Helvetica-Bold"
            ),

            (
                "BOTTOMPADDING",
                (0,0),
                (-1,0),
                12
            )
        ])
    )

    elementos.append(tabla)

    elementos.append(Spacer(1,30))

    # QR

    qr_img = Image(
        qr_path,
        width=120,
        height=120
    )

    elementos.append(qr_img)

    elementos.append(Spacer(1,20))

    # FOOTER

    footer = Paragraph(

        """
        <b>Chevrolet Concesionario</b><br/>
        Gracias por confiar en nosotros 🚗<br/>
        Esta factura fue generada automáticamente.
        """,

        styles["BodyText"]
    )

    elementos.append(footer)

    pdf.build(elementos)

    return nombre_archivo