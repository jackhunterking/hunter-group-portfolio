#!/usr/bin/env python3
from __future__ import annotations

import html
import os
import zipfile
from datetime import date
from pathlib import Path


OUTPUT = Path("jack-ve-tara-codex/outputs/video-audit-2026-07-06/Jack-ve-Tara-video-audit-tracker.xlsx")
MAX_ROWS = 204


def col_letter(n: int) -> str:
    s = ""
    while n:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s


def xml_escape(value: object) -> str:
    return html.escape(str(value), quote=True)


class Cell:
    def __init__(self, value=None, style=0, formula=None):
        self.value = value
        self.style = style
        self.formula = formula


def c(value=None, style=0, formula=None):
    return Cell(value, style, formula)


def sheet_xml(
    name: str,
    rows: list[list[Cell | str | int | float | None]],
    widths: list[float],
    freeze_row: int | None = None,
    freeze_col: int | None = None,
    autofilter: str | None = None,
    validations: list[tuple[str, str]] | None = None,
) -> str:
    cols_xml = []
    for i, width in enumerate(widths, start=1):
        cols_xml.append(f'<col min="{i}" max="{i}" width="{width}" customWidth="1"/>')

    pane_xml = ""
    if freeze_row or freeze_col:
        attrs = []
        if freeze_col:
            attrs.append(f'xSplit="{freeze_col}"')
        if freeze_row:
            attrs.append(f'ySplit="{freeze_row}"')
        top_left = f"{col_letter((freeze_col or 0) + 1)}{(freeze_row or 0) + 1}"
        attrs.append(f'topLeftCell="{top_left}"')
        attrs.append('activePane="bottomRight"')
        attrs.append('state="frozen"')
        pane_xml = f"<pane {' '.join(attrs)}/>"

    row_xml = []
    for r_idx, row in enumerate(rows, start=1):
        cells_xml = []
        for c_idx, raw in enumerate(row, start=1):
            if raw is None:
                continue
            cell = raw if isinstance(raw, Cell) else Cell(raw)
            ref = f"{col_letter(c_idx)}{r_idx}"
            style_attr = f' s="{cell.style}"' if cell.style else ""
            if cell.formula is not None:
                value_xml = "" if cell.value is None else f"<v>{xml_escape(cell.value)}</v>"
                cells_xml.append(f'<c r="{ref}"{style_attr}><f>{xml_escape(cell.formula)}</f>{value_xml}</c>')
            elif isinstance(cell.value, (int, float)) and not isinstance(cell.value, bool):
                cells_xml.append(f'<c r="{ref}"{style_attr}><v>{cell.value}</v></c>')
            elif cell.value is None:
                cells_xml.append(f'<c r="{ref}"{style_attr}/>')
            else:
                cells_xml.append(
                    f'<c r="{ref}" t="inlineStr"{style_attr}><is><t>{xml_escape(cell.value)}</t></is></c>'
                )
        attrs = []
        if r_idx in (1, 2):
            attrs.append('ht="24" customHeight="1"')
        if cells_xml:
            row_xml.append(f'<row r="{r_idx}" {" ".join(attrs)}>{"".join(cells_xml)}</row>')

    autofilter_xml = f'<autoFilter ref="{autofilter}"/>' if autofilter else ""

    validation_xml = ""
    if validations:
        parts = []
        for sqref, formula_ref in validations:
            parts.append(
                '<dataValidation type="list" allowBlank="1" showErrorMessage="1" '
                f'sqref="{xml_escape(sqref)}"><formula1>{xml_escape(formula_ref)}</formula1></dataValidation>'
            )
        validation_xml = f'<dataValidations count="{len(parts)}">{"".join(parts)}</dataValidations>'

    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView showGridLines="0" workbookViewId="0">{pane_xml}</sheetView></sheetViews>
  <cols>{''.join(cols_xml)}</cols>
  <sheetData>{''.join(row_xml)}</sheetData>
  {autofilter_xml}
  {validation_xml}
</worksheet>'''


def styles_xml() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="6">
    <font><sz val="11"/><name val="Aptos"/></font>
    <font><b/><sz val="16"/><color rgb="FFFFFFFF"/><name val="Aptos Display"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
    <font><b/><sz val="12"/><color rgb="FF111827"/><name val="Aptos"/></font>
    <font><sz val="10"/><color rgb="FF374151"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FF111827"/><name val="Aptos"/></font>
  </fonts>
  <fills count="8">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F766E"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF111827"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEFF6FF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFECFDF5"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFBEB"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFEE2E2"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="3">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFE5E7EB"/></left><right style="thin"><color rgb="FFE5E7EB"/></right><top style="thin"><color rgb="FFE5E7EB"/></top><bottom style="thin"><color rgb="FFE5E7EB"/></bottom><diagonal/></border>
    <border><bottom style="medium"><color rgb="FF0F766E"/></bottom></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="11">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="4" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="5" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="6" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="7" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="2" xfId="0" applyFont="1" applyBorder="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="6" borderId="1" xfId="0" applyFill="1" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>'''


def workbook_xml(sheet_names: list[str]) -> str:
    sheets = []
    for i, name in enumerate(sheet_names, start=1):
        sheets.append(f'<sheet name="{xml_escape(name)}" sheetId="{i}" r:id="rId{i}"/>')
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr date1904="false"/>
  <sheets>{''.join(sheets)}</sheets>
  <calcPr calcId="191029" fullCalcOnLoad="1"/>
</workbook>'''


def workbook_rels(sheet_count: int) -> str:
    rels = []
    for i in range(1, sheet_count + 1):
        rels.append(
            f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>'
        )
    rels.append(
        f'<Relationship Id="rId{sheet_count + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    )
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{''.join(rels)}</Relationships>'''


def root_rels() -> str:
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''


def content_types(sheet_count: int) -> str:
    sheet_overrides = "".join(
        f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        for i in range(1, sheet_count + 1)
    )
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  {sheet_overrides}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''


def core_props() -> str:
    today = date(2026, 7, 6).isoformat()
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
 xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"
 xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Jack ve Tara Video Audit Tracker</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{today}T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{today}T00:00:00Z</dcterms:modified>
</cp:coreProperties>'''


def app_props(sheet_names: list[str]) -> str:
    titles = "".join(f'<vt:lpstr>{xml_escape(n)}</vt:lpstr>' for n in sheet_names)
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
 xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>{len(sheet_names)}</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="{len(sheet_names)}" baseType="lpstr">{titles}</vt:vector></TitlesOfParts>
</Properties>'''


def dashboard_rows() -> list[list[Cell | str | None]]:
    rows = [
        [c("Jack ve Tara Video Audit Tracker", 1), None, None, None, None, None, None, None],
        [c("Instagram is the source of truth. Match videos by content, caption, hook, visual subject, and source URL, not by posting date.", 3), None, None, None, None, None, None, None],
        [],
        [c("Metric", 2), c("Count", 2), c("Notes", 2), None, c("Platform", 2), c("Missing", 2), c("Needs Review", 2), c("Complete", 2)],
        [c("Instagram source videos inventoried", 8), c(formula="COUNTA('Instagram Source'!B5:B204)"), c("Rows with an Instagram URL in the source inventory.", 4), None, c("YouTube", 4), c(formula="COUNTIF('Master Match Matrix'!H5:H204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!H5:H204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!H5:H204,\"Found Exact\")")],
        [c("Videos complete across all six non-Instagram platforms", 8), c(formula="COUNTIF('Master Match Matrix'!AG5:AG204,\"Complete\")"), c("Complete means every target platform is Found Exact or intentionally skipped.", 4), None, c("Facebook", 4), c(formula="COUNTIF('Master Match Matrix'!L5:L204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!L5:L204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!L5:L204,\"Found Exact\")")],
        [c("Videos with at least one missing platform", 8), c(formula="COUNTIF('Master Match Matrix'!AF5:AF204,\">0\")"), c("Use Missing Upload Queue to plan repost work.", 4), None, c("TikTok", 4), c(formula="COUNTIF('Master Match Matrix'!P5:P204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!P5:P204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!P5:P204,\"Found Exact\")")],
        [c("Raw platform observations logged", 8), c(formula="COUNTA('Platform Inventory'!D5:D504)"), c("Evidence rows gathered from each account.", 4), None, c("LinkedIn", 4), c(formula="COUNTIF('Master Match Matrix'!T5:T204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!T5:T204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!T5:T204,\"Found Exact\")")],
        [None, None, None, None, c("Threads", 4), c(formula="COUNTIF('Master Match Matrix'!X5:X204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!X5:X204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!X5:X204,\"Found Exact\")")],
        [None, None, None, None, c("X", 4), c(formula="COUNTIF('Master Match Matrix'!AB5:AB204,\"Missing\")"), c(formula="COUNTIF('Master Match Matrix'!AB5:AB204,\"Needs Review\")"), c(formula="COUNTIF('Master Match Matrix'!AB5:AB204,\"Found Exact\")")],
        [],
        [c("Audit Rules", 2), None, None, None, None, None, None, None],
        [c("1. Instagram jack.ve.tara.remax is the source inventory. 2. Dates are context only and must not decide a match. 3. A match needs content similarity: topic, caption, visual subject, and/or downloaded file identity. 4. Confidence below 70% stays Needs Review. 5. Do not upload until the row is reviewed and the platform cell is Missing.", 3), None, None, None, None, None, None, None],
    ]
    return rows


def instagram_rows() -> list[list[Cell | str | None]]:
    headers = [
        "Audit ID", "Instagram URL", "IG post/reel date", "Caption / hook", "Topic", "Visual notes",
        "Duration", "Thumbnail / screenshot file", "Downloaded video file", "Content hash / filename clue",
        "Priority scope", "Source audit status", "Notes"
    ]
    rows = [[c("Instagram Source Inventory", 1)]]
    rows.append([c("One row per Instagram source video. Fill this first from jack.ve.tara.remax.", 3)])
    rows.append([])
    rows.append([c(h, 2) for h in headers])
    for i in range(5, MAX_ROWS + 1):
        rows.append([c(formula=f'IF(B{i}="","","IG-"&TEXT(ROW()-4,"000"))'), "", "", "", "", "", "", "", "", "", "Baseline", "Not Started", ""])
    return rows


def matrix_rows() -> list[list[Cell | str | None]]:
    headers = [
        "Audit ID", "Instagram URL", "Caption / hook", "Topic", "Visual notes", "Priority scope", "IG downloaded file",
        "YouTube status", "YouTube URL", "YT confidence", "YT notes",
        "Facebook status", "Facebook URL", "FB confidence", "FB notes",
        "TikTok status", "TikTok URL", "TT confidence", "TT notes",
        "LinkedIn status", "LinkedIn URL", "LI confidence", "LI notes",
        "Threads status", "Threads URL", "TH confidence", "TH notes",
        "X status", "X URL", "X confidence", "X notes",
        "Missing count", "Overall action", "Owner", "Priority", "Final notes"
    ]
    rows = [[c("Master Match Matrix", 1)]]
    rows.append([c("This is the working source of truth for what is missing. Platform statuses should be based on content matches, not dates.", 3)])
    rows.append([])
    rows.append([c(h, 2) for h in headers])
    for i in range(5, MAX_ROWS + 1):
        src_row = i
        missing_formula = f'IF(A{src_row}="","",COUNTIF(H{src_row},"Missing")+COUNTIF(L{src_row},"Missing")+COUNTIF(P{src_row},"Missing")+COUNTIF(T{src_row},"Missing")+COUNTIF(X{src_row},"Missing")+COUNTIF(AB{src_row},"Missing"))'
        pending_formula = f'COUNTIF(H{src_row},"Not Started")+COUNTIF(L{src_row},"Not Started")+COUNTIF(P{src_row},"Not Started")+COUNTIF(T{src_row},"Not Started")+COUNTIF(X{src_row},"Not Started")+COUNTIF(AB{src_row},"Not Started")'
        action_formula = f'IF(A{src_row}="","",IF({pending_formula}>0,"Audit pending",IF(AF{src_row}=0,"Complete",IF(AF{src_row}=6,"Post everywhere except Instagram","Post missing platforms"))))'
        rows.append([
            c(formula=f"'Instagram Source'!A{src_row}"),
            c(formula=f"'Instagram Source'!B{src_row}"),
            c(formula=f"'Instagram Source'!D{src_row}"),
            c(formula=f"'Instagram Source'!E{src_row}"),
            c(formula=f"'Instagram Source'!F{src_row}"),
            c(formula=f"'Instagram Source'!K{src_row}"),
            c(formula=f"'Instagram Source'!I{src_row}"),
            "Not Started", "", "", "",
            "Not Started", "", "", "",
            "Not Started", "", "", "",
            "Not Started", "", "", "",
            "Not Started", "", "", "",
            "Not Started", "", "", "",
            c(formula=missing_formula),
            c(formula=action_formula),
            "", "Medium", "",
        ])
    return rows


def platform_inventory_rows() -> list[list[Cell | str | None]]:
    headers = [
        "Observation ID", "Platform", "Account URL", "Post URL", "Observed title/caption",
        "Observed topic", "Visual notes", "Observed post date", "Matched Audit ID",
        "Match confidence", "Duplicate risk", "Evidence notes", "Screenshot file"
    ]
    rows = [[c("Platform Inventory", 1)]]
    rows.append([c("Raw observations from YouTube, Facebook, TikTok, LinkedIn, Threads, and X. Keep all evidence here before changing the master status.", 3)])
    rows.append([])
    rows.append([c(h, 2) for h in headers])
    for i in range(5, 505):
        rows.append([f"OBS-{i-4:03d}", "", "", "", "", "", "", "", "", "", "", "", ""])
    return rows


def missing_queue_rows() -> list[list[Cell | str | None]]:
    headers = [
        "Queue ID", "Audit ID", "Platform to update", "Instagram URL", "Caption / hook",
        "Topic", "Video file", "Caption source", "Ready to upload?", "Uploaded URL",
        "Posted date", "Publish status", "Notes"
    ]
    rows = [[c("Missing Upload Queue", 1)]]
    rows.append([c("Add one row per missing platform only after the master matrix marks that platform Missing. This is the execution queue for catch-up posting.", 3)])
    rows.append([])
    rows.append([c(h, 2) for h in headers])
    for i in range(5, 405):
        rows.append([f"Q-{i-4:03d}", "", "", "", "", "", "", "Instagram caption", "No", "", "", "Not Started", ""])
    return rows


def lookup_rows() -> list[list[Cell | str | None]]:
    rows = [
        [c("Lookup Lists", 1)],
        [c("Statuses", 2), c("Platforms", 2), c("Priority scope", 2), c("Ready?", 2), c("Publish status", 2), c("Brand account", 2), c("URL / handle", 2)],
        ["Not Started", "Instagram", "Baseline", "No", "Not Started", "YouTube", "https://www.youtube.com/@jackvetara"],
        ["Found Exact", "YouTube", "Catch-up later", "Yes", "Staged", "Instagram", "https://www.instagram.com/jack.ve.tara.remax"],
        ["Likely Match", "Facebook", "Archive only", "Needs Review", "Published", "LinkedIn", "https://www.linkedin.com/company/jackvetara"],
        ["Needs Review", "TikTok", "Do not post", "", "Skipped", "Facebook", "https://www.facebook.com/jack.ve.tara.remax"],
        ["Missing", "LinkedIn", "", "", "", "TikTok", "https://www.tiktok.com/@jack.ve.tara.remax"],
        ["Intentionally Skipped", "Threads", "", "", "", "Threads", "https://www.threads.net/@jack.ve.tara.remax"],
        ["Duplicate Risk", "X", "", "", "", "X", "https://x.com/jackvetara"],
    ]
    return rows


def write_package(output: Path) -> None:
    sheets = [
        ("Dashboard", dashboard_rows(), [44, 14, 60, 3, 16, 12, 14, 12], None, None, None, None),
        ("Instagram Source", instagram_rows(), [14, 36, 16, 42, 28, 34, 12, 28, 34, 28, 18, 18, 36], 4, 1, "A4:M204", [("K5:K204", "'Lookup Lists'!$C$3:$C$6"), ("L5:L204", "'Lookup Lists'!$A$3:$A$9")]),
        ("Master Match Matrix", matrix_rows(), [14, 36, 42, 26, 30, 16, 28, 18, 32, 14, 24, 18, 32, 14, 24, 18, 32, 14, 24, 18, 32, 14, 24, 18, 32, 14, 24, 18, 32, 14, 24, 14, 24, 16, 12, 32], 4, 1, "A4:AJ204", [("H5:H204 L5:L204 P5:P204 T5:T204 X5:X204 AB5:AB204", "'Lookup Lists'!$A$3:$A$9"), ("AI5:AI204", "'Lookup Lists'!$C$3:$C$6")]),
        ("Platform Inventory", platform_inventory_rows(), [15, 14, 34, 36, 44, 26, 34, 16, 18, 16, 18, 34, 26], 4, 1, "A4:M504", [("B5:B504", "'Lookup Lists'!$B$3:$B$9"), ("J5:J504", "'Lookup Lists'!$A$3:$A$9")]),
        ("Missing Upload Queue", missing_queue_rows(), [14, 14, 18, 36, 42, 26, 34, 22, 16, 34, 16, 18, 34], 4, 1, "A4:M404", [("C5:C404", "'Lookup Lists'!$B$4:$B$9"), ("I5:I404", "'Lookup Lists'!$D$3:$D$5"), ("L5:L404", "'Lookup Lists'!$E$3:$E$6")]),
        ("Lookup Lists", lookup_rows(), [20, 18, 20, 16, 18, 18, 42], None, None, None, None),
    ]
    sheet_names = [s[0] for s in sheets]
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types(len(sheets)))
        z.writestr("_rels/.rels", root_rels())
        z.writestr("docProps/core.xml", core_props())
        z.writestr("docProps/app.xml", app_props(sheet_names))
        z.writestr("xl/workbook.xml", workbook_xml(sheet_names))
        z.writestr("xl/_rels/workbook.xml.rels", workbook_rels(len(sheets)))
        z.writestr("xl/styles.xml", styles_xml())
        for idx, (name, rows, widths, freeze_row, freeze_col, autofilter, validations) in enumerate(sheets, start=1):
            z.writestr(
                f"xl/worksheets/sheet{idx}.xml",
                sheet_xml(name, rows, widths, freeze_row, freeze_col, autofilter, validations),
            )


if __name__ == "__main__":
    write_package(OUTPUT)
    print(OUTPUT)
